import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import { ErrorObject } from '../helpers/error';
import { readExcelFile } from '../helpers/readExcelFile';
import { EventDto, PaginationDto } from '../interfaces';
import { Event, EventRegistrations, Location, User } from '../database/models';
import * as userServices from './user';

export const createEvent = async ({
  latitude,
  longitude,
  ...eventDto
}: EventDto) => {
  try {
    await userServices.getUserById(eventDto.organizerId);
    const eventId = v4();
    const event = await Event.create({
      id: eventId,
      condition: true,
      ...eventDto,
    });

    await Location.create({
      id: v4(),
      eventId,
      latitude,
      longitude,
    });

    return event;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getEvents = async ({ limit, offset, title }: PaginationDto) => {
  try {
    const events = await Event.findAll({
      where: {
        condition: true,
        title: { [Op.like]: `%${title}%` },
      },
      offset,
      limit,
      include: [
        { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
      ],
    });
    return events;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await Event.findOne({
      where: { id, condition: true },
      include: [
        { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
        {
          model: User,
          as: 'assistants',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
        {
          model: Location,
          attributes: ['latitude', 'longitude'],
          as: 'location',
        },
      ],
    });
    if (!event) throw new ErrorObject(`Event not found with id: ${id}`, 404);
    return event;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const updateEvent = async (
  id: string,
  { organizerId, latitude, longitude, ...eventBody }: EventDto
) => {
  try {
    const event = await getEventById(id);
    if (latitude && longitude) {
      await Location.destroy({
        where: {
          eventId: id,
        },
      });
      await Location.create({
        id: v4(),
        eventId: id,
        latitude,
        longitude,
      });
    }
    if (organizerId) await userServices.getUserById(organizerId);
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

export const registerAssistants = async (
  eventId: string,
  userIds: string[]
) => {
  try {
    const event = await getEventById(eventId);
    userIds.map(async (userId) => {
      await existAssistant(eventId, userId);
      await userServices.getUserById(userId);
      await EventRegistrations.create({
        id: v4(),
        eventId,
        userId,
      });
    });

    return event.reload();
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const existAssistant = async (eventId: string, userId: string) => {
  try {
    const exist = await EventRegistrations.findOne({
      where: {
        eventId,
        userId,
      },
    });
    return exist;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getAssistants = async (eventId: string) => {
  try {
    const assistants = await Event.findOne({
      where: { id: eventId, condition: true },
      attributes: [],
      include: [
        {
          model: User,
          as: 'assistants',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
      ],
    });

    return assistants;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const loadEvents = async (userAuthId: string, file: UploadedFile) => {
  try {
    const events = await readExcelFile(file.tempFilePath);
    events.map(async (eventFile) => {
      const newEvent = {
        ...eventFile,
        organizerId: userAuthId,
        startDateTime: new Date(eventFile.startDateTime),
        endDateTime: new Date(eventFile.endDateTime),
      };

      await createEvent(newEvent as EventDto);
    });
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
