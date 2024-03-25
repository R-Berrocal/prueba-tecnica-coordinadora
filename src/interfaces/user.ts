import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface UserTypes
  extends Model<
    InferAttributes<UserTypes>,
    InferCreationAttributes<UserTypes>
  > {
  id: string;
  name: string;
  email: string;
  password: string;
  condition: boolean;
}
