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
 *   tokenAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    in: header
 *    name: Authorization
 *    description: token
 *    required: true
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
