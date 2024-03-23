import { v4 } from 'uuid';
import { ErrorObject } from '../helpers/error';
import { EventTypes } from '../interfaces';
import { Event, User } from '../database/models';
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

export const getEvents = async (limit: number, offset: number) => {
  try {
    const users = await Event.findAll({
      where: {
        condition: true,
      },
      offset,
      limit,
      include: [{ model: User, as: 'organizer' }],
    });
    return users;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await Event.findOne({ where: { id, condition: true } });
    if (!event) throw new ErrorObject(`Event not found with id: ${id}`, 404);
    return event;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const updateEvent = async (id: string, eventBody: EventTypes) => {
  try {
    const event = await getEventById(id);
    await event.update(eventBody);
    return event;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const event = await getEventById(id);
    event.update({ condition: false });
    return event;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
