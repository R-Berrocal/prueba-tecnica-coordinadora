import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface EventRegistrationsTypes
  extends Model<
    InferAttributes<EventRegistrationsTypes>,
    InferCreationAttributes<EventRegistrationsTypes>
  > {
  id: string;
  userId: string;
  eventId: string;
}

export interface EventsAssistants {
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  condition: boolean;
  startDateTime: string;
  endDateTime: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  assistants: Assistant[];
}

export interface Assistant {
  id: string;
  name: string;
  email: string;
  event_registrations: EventRegistrations;
}

export interface EventRegistrations {
  createdAt: string;
}
