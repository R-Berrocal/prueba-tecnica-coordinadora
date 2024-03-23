import { check } from 'express-validator';
import { validateCheck } from './validateCheck';

export const authLoginMiddleware = [
  check('email', 'Is not email').isEmail().notEmpty(),
  check('password', 'Min 6 characters')
    .isString()
    .isLength({ min: 6 })
    .notEmpty(),
  validateCheck,
];
