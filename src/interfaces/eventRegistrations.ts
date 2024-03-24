import {
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

export interface EventRegistrationsTypes
  extends Model<
    InferAttributes<EventRegistrationsTypes>,
    InferCreationAttributes<EventRegistrationsTypes>
  > {
  id: string;
  userId: string;
  eventId: string;
}
