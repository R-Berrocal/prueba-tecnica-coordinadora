import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface LocationTypes
  extends Model<
    InferAttributes<LocationTypes>,
    InferCreationAttributes<LocationTypes>
  > {
  id: string;
  eventId: string;
  latitude: number;
  longitude: number;
}
