import bcryptjs from 'bcryptjs';
import { getUserByEmail } from './user';
import { ErrorObject } from '../helpers/error';
import { generateJWT } from '../helpers/generateJwt';

export const login = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user || !user.condition) {
      throw new ErrorObject('Password / email incorrect', 404);
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorObject('Password / email incorrect', 404);
    }
    return {
      user,
      token: await generateJWT(user.id),
    };
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
