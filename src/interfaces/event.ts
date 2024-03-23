import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export interface EventTypes
  extends Model<
    InferAttributes<EventTypes>,
    InferCreationAttributes<EventTypes>
  > {
  id: string;
  title: string;
  description: CreationOptional<string>;
  location: CreationOptional<string>;
  startDateTime: Date;
  endDateTime: CreationOptional<Date>;
  organizerId: string;
}
