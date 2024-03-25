import { v4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import User from '../database/models/user';
import { ErrorObject } from '../helpers/error';
import { UserTypes } from '../interfaces';
import { Event } from '../database/models';

export const createUser = async (userBody: UserTypes) => {
  try {
    userBody.id = v4();
    const user = User.build(userBody);

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(userBody.password, salt);

    return await user.save();
  } catch (error: any) {
    if (error.parent?.code === '23505') {
      throw new ErrorObject('User already exists', 400);
    }
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
      include: [{ model: Event, as: 'events' }],
    });
    return users;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await getUserById(id);

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
    const user = await User.findOne({
      where: {
        id,
        condition: true,
      },
    });
    if (!user) throw new ErrorObject(`User not found with id: ${id}`, 404);
    return user;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
