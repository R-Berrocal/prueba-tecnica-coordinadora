import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import * as userService from '../services/user';
import { generateJWT } from '../helpers/generateJwt';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    in: header
 *    name: Authorization
 *    description: Bearer token to access these api endpoints
 *    scheme: bearer
 *    bearerFormat: JWT
 *    required: true
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     password:
 *      type: string
 *     condition:
 *      type: boolean
 *     createdAt:
 *      type: string
 *     updatedAt:
 *      type: string
 *    example:
 *     id: 546758dr4t342323g
 *     name: John Doe
 *     email: 0SjXj@example.com
 *     password: password123
 *     condition: true
 *     createdAt: 2022-01-01T00:00:00.000Z
 *     updatedAt: 2022-01-01T00:00:00.000Z 
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User routes
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *   tags:
 *   - User
 *   summary: Register a new user
 *   description: Register a new user
 *   requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *           required: true
 *          email:
 *           type: string
 *           required: true
 *           format: email
 *          password:
 *           type: string
 *           required: true
 *           format: password
 *   responses:
 *     '200':
 *      description: User Created Successfully
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          status:
 *           type: boolean
 *          code:
 *            type: number
 *          message:
 *           type: string
 *          body:
 *           type: object
 *           properties:
 *            user:
 *             type: object
 *             properties:
 *              condition:
 *               type: boolean
 *              name:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *              id:
 *               type: string
 *              updatedAt:
 *               type: string
 *              createdAt:
 *               type: string
 *            token:
 *             type: string
 *         example:
 *          status: true
 *          code: 200
 *          message: User Created Successfully
 *          body:
 *           user:
 *            condition: true
 *            name: John Doe
 *            email: 0SjXj@example.com
 *            password: John12345
 *            id: 546758dr4t342323g
 *            updatedAt: 2022-11-04T18:37:47.000Z
 *            createdAt: 2022-11-04T18:37:47.000Z
 *           token: 546758dr4t342323g
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [User]
 *    summary: List all users.
 *    responses:
 *      200:
 *        description: List all users in database.
 *        content:
 *          application/json:
 *            schema:
 *            type: array
 *            items:
 *              properties:
 *                id:
 *                  type: string
 *                  example: akslfjasdf
 *                name:
 *                  type: string
 *                  example: Test
 *                email:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: sadjfaskldfjaljfñlds
 *                condition:
 *                  type: boolean
 *                  example: true
 *                createdAt:
 *                  type: string
 *                  example: 2022-11-04T18:37:47.000Z
 *                updatedAt:
 *                  type: string
 *                  example: 2022-11-04T18:37:47.000Z 
 *      401:
 *        description: Token is required
 *      500:
 *        description: Internal server error
 *  
 */

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *   tags: [User]
 *   summary: Delete a user
 *   description: Delete a user
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: User id
 *   responses:
 *    200:
 *     description: User deleted successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: boolean
 *         code:
 *          type: number
 *          example: 200
 *         message:
 *          type: string
 *         body:
 *          type: object
 *          properties:
 *           user:
 *            type: object
 *            properties:
 *             condition:
 *              type: boolean
 *             name:
 *              type: string
 *             email:
 *              type: string
 *             password:
 *              type: string
 *             id:
 *              type: string
 *             updatedAt:
 *              type: string
 *             createdAt:
 *              type: string
 *    401:
 *      description: Token is required
 *    404:
 *      description: User not found
 *    500:
 *      description: Internal server error
 * 
 */

export const postUser = catchAsync(
  async ({ body }: Request, res: Response, next: Function) => {
    try {
      const user = await userService.createUser(body);
      endpointResponse({
        res,
        message: 'User Created Successfully',
        body: {
          user,
          token: await generateJWT(user.id),
        },
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create user] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const getAllUsers = catchAsync(
  async ({ query }: Request, res: Response, next: Function) => {
    try {
      const { offset = 0, limit = 10 } = query;
      const users = await userService.getUsers(+limit, +offset);
      endpointResponse({
        res,
        message: 'Get All Users Successfully',
        body: users,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const deleteUser = catchAsync(
  async ({ params }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const user = await userService.deleteUser(id);
      endpointResponse({
        res,
        message: 'User deleted successfully',
        body: user,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error delete user] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }
);
