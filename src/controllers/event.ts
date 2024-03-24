import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { catchAsync } from '../helpers/catchAsync';
import { endpointResponse } from '../helpers/success';
import * as eventServices from '../services/event';

/**
 * @swagger
 * components:
 *  schemas:
 *   Event:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     location:
 *      type: string
 *     startDateTime:
 *      type: string
 *     endDateTime:
 *      type: string
 *     organizerId:
 *      type: string
 *     createdAt:
 *      type: string
 *     updatedAt:
 *      type: string
 *     condition:
 *      type: boolean
 *     example:
 *      id: 546758dr4t342323g
 *      title: Test
 *      description: Test
 *      location: Test
 *      startDateTime: 2022-11-04T18:37:47.000Z
 *      endDateTime: 2022-11-04T18:37:47.000Z
 *      organizerId: 546758dr4t342323g
 *      createdAt: 2022-11-04T18:37:47.000Z
 *      updatedAt: 2022-11-04T18:37:47.000Z
 *      condition: true
 * tags:
 *  name: Event
 *  description: Event routes
 */

/**
 * @swagger
 * /api/events:
 *  post:
 *   tags:
 *   - Event
 *   summary: Register a new event
 *   description: Register a new event
 *   requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          title:
 *           type: string
 *           required: true
 *          description:
 *           type: string
 *          location:
 *           type: string
 *          startDateTime:
 *           type: string
 *           required: true
 *           format: date-time
 *          endDateTime:
 *           type: string
 *           required: true
 *           format: date-time
 *          organizerId:
 *           type: string
 *           required: true
 *           format: uuid
 *
 *   responses:
 *     200:
 *      description: Event Created Successfully
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
 *            condition:
 *             type: boolean
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            location:
 *             type: string
 *            startDateTime:
 *             type: string
 *            endDateTime:
 *             type: string
 *            organizerId:
 *             type: string
 *            id:
 *             type: string
 *            updatedAt:
 *             type: string
 *            createdAt:
 *             type: string
 *         example:
 *          status: true
 *          code: 200
 *          message: Event Created Successfully
 *          body:
 *           condition: true
 *           title: Test
 *           description: Test
 *           location: Test
 *           startDateTime: 2022-11-04T18:37:47.000Z
 *           endDateTime: 2022-11-04T18:37:47.000Z
 *           organizerId: 546758dr4t342323g
 *           id: 546758dr4t342323g
 *           updatedAt: 2022-11-04T18:37:47.000Z
 *           createdAt: 2022-11-04T18:37:47.000Z
 */

/**
 * @swagger
 * /api/events:
 *  get:
 *   tags:
 *   - Event
 *   summary: Get all events
 *   description: Get all events
 *   responses:
 *    200:
 *     description: GetAll events successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: boolean
 *         code:
 *          type: number
 *         message:
 *          type: string
 *         body:
 *          type: array
 *          items:
 *           type: object
 *           properties:
 *            condition:
 *             type: boolean
 *            title:
 *             type: string
 *            description:
 *             type: string
 *            location:
 *             type: string
 *            startDateTime:
 *             type: string
 *            endDateTime:
 *             type: string
 *            organizerId:
 *             type: string
 *            id:
 *             type: string
 *            updatedAt:
 *             type: string
 *            createdAt:
 *             type: string
 *            organizer:
 *             type: object
 *             properties:
 *              id:
 *               type: string
 *              name:
 *               type: string
 *              email:
 *               type: string
 *         example:
 *          status: true
 *          code: 200
 *          message: GetAll events successfully
 *          body:
 *           condition: true
 *           title: Test
 *           description: Test
 *           location: Test
 *           startDateTime: 2022-11-04T18:37:47.000Z
 *           endDateTime: 2022-11-04T18:37:47.000Z
 *           organizerId: 546758dr4t342323g
 *           id: 546758dr4t342323g
 *           updatedAt: 2022-11-04T18:37:47.000Z
 *           createdAt: 2022-11-04T18:37:47.000Z
 *           organizer:
 *            id: 546758dr4t342323g
 *            name: Test
 *            email: 0Lh9w@example.com
 *    500:
 *     description: Internal server error
 */

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
