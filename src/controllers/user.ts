import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import * as userService from '../services/user';

export const postUser = catchAsync(
  async ({ body }: Request, res: Response, next: Function) => {
    try {
      const user = await userService.createUser(body);
      endpointResponse({
        res,
        message: 'User Created Successfully',
        body: user,
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
