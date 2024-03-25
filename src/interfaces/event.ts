import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export interface EventTypes
  extends Model<
    InferAttributes<EventTypes>,
    InferCreationAttributes<EventTypes>
  > {
  id: string;
  title: string;
  description: CreationOptional<string>;
  condition: boolean;
  startDateTime: Date;
  endDateTime: CreationOptional<Date>;
  organizerId: string;
}

export interface PaginationDto {
  offset: number;
  limit: number;
  title: string;
}

export interface EventDto {
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  organizerId: string;
  latitude: number;
  longitude: number;
}
