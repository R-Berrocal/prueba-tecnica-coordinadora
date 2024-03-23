import jwt from 'jsonwebtoken';
import { drawLogger } from '../utils/drawLogger';

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY!,
      {
        expiresIn: '1y',
      },
      (err, token) => {
        if (err) {
          drawLogger(1, err);
          reject("Couldn't generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
