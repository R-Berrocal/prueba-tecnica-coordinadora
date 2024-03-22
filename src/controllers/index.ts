import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import { getIndex } from '../services';

// example of a controller. First call the service, then build the controller method
export const get = catchAsync(
  async (req: Request, res: Response, next: Function) => {
    try {
      const response = await getIndex();
      endpointResponse({
        res,
        message: 'Index successfully retrieved',
        body: response,
      });
    } catch (error: any) {
        console.log(error);
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }
);
