import { check } from 'express-validator';
import { validateCheck } from './validateCheck';

export const createUserMiddleware = [
  check('name', 'Must be a String').isString().notEmpty(),
  check('email', 'Is not email').isEmail().notEmpty(),
  check('password', 'Min 6 characters')
    .isString()
    .isLength({ min: 6 })
    .notEmpty(),
  validateCheck,
];

export const updateUserMiddleware = [
  check('name').isString().notEmpty().optional({ nullable: true }),
  check('email', 'Is not email').isEmail().optional({ nullable: true }),
  check('password', 'Min 6 characters')
    .isString()
    .isLength({ min: 6 })
    .optional({ nullable: true }),
  check('condition', 'Is not Boolean').isBoolean().optional({ nullable: true }),
  validateCheck,
];
