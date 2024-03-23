import { v4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import User from '../database/models/user';
import { ErrorObject } from '../helpers/error';
import { UserTypes } from '../interfaces';

export const createUser = async (userBody: UserTypes) => {
  try {
    userBody.id = v4();
    const user = User.build(userBody);

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(userBody.password, salt);

    return await user.save();
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getUsers = async (limit: number, offset: number) => {
  try {
    const users = await User.findAll({
      where: {
        condition: true,
      },
      offset,
      limit,
    });
    return users;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new ErrorObject('User not found', 404);

    user.update({ condition: false });

    return user;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: {
        email,
        condition: true,
      },
    });

    return user;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new ErrorObject('User not found', 404);
    return user;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
