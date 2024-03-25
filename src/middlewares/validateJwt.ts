import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import RequestUserAuth from '../interfaces/requestUserAuth';
import { TokenPayload } from '../interfaces';
import * as userServices from '../services/user';
import { ErrorObject } from '../helpers/error';

export const validateJWT = async (
  req: RequestUserAuth,
  res: Response,
  next: Function
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({
      msg: 'token is required',
    });
  }
  try {
    const { id } = jwt.verify(
      token,
      process.env.SECRET_OR_PRIVATE_KEY!
    ) as TokenPayload;

    const user = await userServices.getUserById(id);

    if (!user.condition) {
      throw new ErrorObject('Token is not valid - user not active', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
