import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import * as eventServices from '../services/event';

export const postEvent = catchAsync(
  async ({ body }: Request, res: Response, next: Function) => {
    try {
      const event = await eventServices.createEvent(body);
      endpointResponse({
        res,
        message: 'Event created Successfully',
        body: event,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create event] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);
