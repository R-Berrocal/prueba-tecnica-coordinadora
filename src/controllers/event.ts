import createHttpError from 'http-errors';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import RequestUserAuth from '../interfaces/requestUserAuth';
import { catchAsync } from '../helpers/catchAsync';
import { ErrorObject } from '../helpers/error';
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
 *     organizer:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *       name:
 *        type: string
 *       email:
 *        type: string
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
 *           $ref: '#/components/schemas/Event'
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
 *   parameters:
 *   - in: query
 *     name: offset
 *     type: number
 *     description: Offset
 *   - in: query
 *     name: limit
 *     type: number
 *     description: Limit
 *   - in: query
 *     name: title
 *     type: string
 *     description: Title
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
 *           $ref: '#/components/schemas/Event'
 *    500:
 *     description: Internal server error
 */

/**
 * @swagger
 * /api/events/{id}:
 *  get:
 *   tags:
 *   - Event
 *   summary: Get event
 *   description: Get event
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     required: true
 *     description: Event id
 *   responses:
 *    200:
 *     description: Get event successfully
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
 *          type: object
 *          properties:
 *           id:
 *            type: string
 *           title:
 *            type: string
 *           description:
 *            type: string
 *           location:
 *            type: string
 *           startDateTime:
 *            type: string
 *            format: date-time
 *           endDateTime:
 *            type: string
 *            format: date-time
 *           organizerId:
 *            type: string
 *            format: uuid
 *           createdAt:
 *            type: string
 *            format: date-time
 *           updatedAt:
 *            type: string
 *            format: date-time
 *           organizer:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 *             name:
 *              type: string
 *             email:
 *              type: string
 *           assistants:
 *            type: array
 *            items:
 *             type: object
 *             properties:
 *              id:
 *               type: string
 *              name:
 *               type: string
 *              email:
 *               type: string
 *    404:
 *     description: Event not found
 *    500:
 *     description: Internal server error
 *
 */

/**
 * @swagger
 * /api/events/{id}:
 *  put:
 *   tags:
 *   - Event
 *   summary: Update event
 *   description: Update event
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     required: true
 *     description: Event id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        location:
 *         type: string
 *        condition:
 *         type: boolean
 *        startDateTime:
 *         type: string
 *         format: date-time
 *        endDateTime:
 *         type: string
 *         format: date-time
 *        organizerId:
 *         type: string
 *         format: uuid
 *   responses:
 *    200:
 *     description: Update event successfully
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
 *          type: object
 *          $ref: '#/components/schemas/Event'
 *    404:
 *     description: Event not found | User not found
 *    500:
 *     description: Internal server error
 */

/**
 * @swagger
 * /api/events/{id}:
 *  delete:
 *   tags:
 *   - Event
 *   summary: Delete event
 *   description: Delete event
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     required: true
 *     description: Event id
 *   responses:
 *    200:
 *     description: Delete event successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /api/events/{id}/register:
 *  post:
 *   tags:
 *   - Event
 *   summary: Register event
 *   description: Register event
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     required: true
 *     description: Event id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userIds:
 *         type: array
 *         items:
 *          type: string
 *          format: uuid
 *   responses:
 *    200:
 *     description: Register event successfully
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
 *          type: object
 *          $ref: '#/components/schemas/Event'
 *    404:
 *     description: Event not found | User not found
 *    500:
 *     description: Internal server error
 */

/**
 * @swagger
 * /api/events/{id}/registrations:
 *  get:
 *   tags:
 *   - Event
 *   summary: Get event registrations
 *   description: Get assistants of an event
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     required: true
 *     description: Event id
 *   responses:
 *    200:
 *     description: Get event registrations successfully
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
 *          type: object
 *          $ref: '#/components/schemas/Event'
 *    404:
 *     description: Event not found
 *    500:
 *     description: Internal server error
 */

/**
 * @swagger
 * /api/events/load:
 *   post:
 *     tags:
 *       - Event
 *     summary: Uploads events from an Excel file.
 *     description: Uploads events from an Excel file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               events:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Events loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 body:
 *                   type: string
 *       400:
 *         description: Error - Invalid file
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
      const { limit = 10, offset = 0, title = '' } = query;
      const events = await eventServices.getEvents({
        limit: +limit,
        offset: +offset,
        title: title as string,
      });
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

export const registerAssistants = catchAsync(
  async ({ params, body }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const { userIds } = body;
      const event = await eventServices.registerAssistants(id, userIds);
      endpointResponse({
        res,
        message: 'Register Assistants successfully',
        body: event,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error Register Assistants] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const getAssistants = catchAsync(
  async ({ params }: Request, res: Response, next: Function) => {
    try {
      const { id } = params;
      const assistants = await eventServices.getAssistants(id);
      endpointResponse({
        res,
        message: 'Get Assistants successfully',
        body: assistants,
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error get Assistants] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }
);

export const loadEvents = catchAsync(
  async ({ user, files }: RequestUserAuth, res: Response, next: Function) => {
    try {
      if (!files) throw new ErrorObject('File not found', 404);
      await eventServices.loadEvents(user.id, files.events as UploadedFile);

      endpointResponse({
        res,
        message: 'File uploaded successfully',
        body: 'fileUploaded',
      });
    } catch (error: any) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error upload file] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }
);
