import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { catchAsync } from '../helpers/catchAsync';
import * as authService from '../services/auth';
import { endpointResponse } from '../helpers/success';
import RequestUserAuth from '../interfaces/requestUserAuth';
import { generateJWT } from '../helpers/generateJwt';

/**
 * @swagger
 * components:
 *  schemas:
 *   UserAuth:
 *    type: object
 *    properties:
 *     user:
 *      $ref: '#/components/schemas/User'
 *     token:
 *      type: string
 *    example:
 *     user:
 *      id: 546758dr4t342323g
 *      name: John Doe
 *      email: 0SjXj@example.com
 *      password: password123
 *      condition: true
 *      createdAt: 2022-01-01T00:00:00.000Z
 *      updatedAt: 2022-01-01T00:00:00.000Z
 *     token: 546758dr4t342323gsadfasfsdf
 */

/**
 * @swagger
 * tags:
 *  name: UserAuth
 *  description: UserAuth routes
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   tags:
 *   - UserAuth
 *   summary:  Login user
 *   description: Login user
 *   requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *           required: true
 *           format: email
 *          password:
 *           type: string
 *           required: true
 *           format: password
 *   responses:
 *     200:
 *      description: Login success
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
 *             $ref: '#/components/schemas/User'
 *            token:
 *             type: string
 *         example:
 *          status: true
 *          code: 200
 *          message: Login Success
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
 *     404:
 *      description: Password / email incorrect
 */

/**
 * @swagger
 * /api/auth:
 *  get:
 *   tags:
 *   - UserAuth
 *   summary:  Revalidate token
 *   description: Revalidate token
 *   responses:
 *     200:
 *      description: Revalidate token success
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
 *             $ref: '#/components/schemas/User'
 *            token:
 *             type: string
 */

export const authLogin = catchAsync(
  async ({ body }: Request, res: Response, next: Function) => {
    try {
      const { email, password } = body;
      const user = await authService.login(email, password);
      endpointResponse({
        res,
        message: 'Login Success',
        body: user,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error login user] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const authRevalidateToken = catchAsync(
  async (req: RequestUserAuth, res: Response, next: Function) => {
    try {
      const user = req.user;
      const token = await generateJWT(user.id);
      endpointResponse({
        res,
        message: 'Revalidate token success',
        body: { user, token },
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error revalidate token] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);
