import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import * as eventServices from '../services/event';

export const postEvent = catchAsync(
  async ({ body }: Request, res: Response, next: Function) => {
    try {
      const eventCreate = await eventServices.createEvent(body);
      endpointResponse({
        res,
        message: 'Event created Successfully',
        body: eventCreate,
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

export const getAllEvents = catchAsync(
  async ({ query }: Request, res: Response, next: Function) => {
    try {
      const { limit = 10, offset = 0 } = query;
      const events = await eventServices.getEvents(+limit, +offset);
      endpointResponse({
        res,
        message: 'GetAll events successfully',
        body: events,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error get events] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const getEvent = catchAsync(
  async ({ params }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const event = await eventServices.getEventById(id);
      endpointResponse({
        res,
        message: 'Get event successfully',
        body: event,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error get event] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const updateEvent = catchAsync(
  async ({ params, body }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const eventUpdated = await eventServices.updateEvent(id, body);
      endpointResponse({
        res,
        message: 'Update event successfully',
        body: eventUpdated,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error upate event] - [index - UPDATE]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const deleteEvent = catchAsync(
  async ({ params }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const eventDelete = await eventServices.deleteEvent(id);
      endpointResponse({
        res,
        message: 'Delete event successfully',
        body: eventDelete,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error Delete event] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }
);
