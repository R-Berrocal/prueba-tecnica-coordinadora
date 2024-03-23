import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { catchAsync } from '../helpers/catchAsync';
import * as authService from '../services/auth';
import { endpointResponse } from '../helpers/success';
import RequestUserAuth from '../interfaces/requestUserAuth';
import { generateJWT } from '../helpers/generateJwt';

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
