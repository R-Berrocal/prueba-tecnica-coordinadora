import { v4 } from 'uuid';
import { ErrorObject } from '../helpers/error';
import { EventTypes } from '../interfaces';
import { Event } from '../database/models';
import * as userServices from './user';

export const createEvent = async (eventBody: EventTypes) => {
  try {
    await userServices.getUserById(eventBody.organizerId);
    eventBody.id = v4();
    const event = Event.build(eventBody);

    return await event.save();
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
