import { check } from 'express-validator';
import { validateCheck } from './validateCheck';
import { validateJWT } from './validateJwt';

export const createEventMiddleware = [
  check('title', 'Must be a String').isString().notEmpty(),
  check('description', 'Must be a String')
    .isString()
    .optional({ nullable: true }),
  check('startDateTime', 'Must be a Date').isISO8601().toDate().notEmpty(),
  check('endDateTime', 'Must be a Date')
    .isISO8601()
    .toDate()
    .optional({ nullable: true }),
  check('organizerId', 'Must be a UUID').isUUID().notEmpty(),
  check('latitude', 'Must be a Number').isNumeric().notEmpty(),
  check('longitude', 'Must be a Number').isNumeric().notEmpty(),
  validateJWT,
  validateCheck,
];

export const updateEventMiddleware = [
  check('title', 'Must be a String').isString().optional({ nullable: true }),
  check('description', 'Must be a String')
    .isString()
    .optional({ nullable: true }),
  check('startDateTime', 'Must be a Date')
    .isISO8601()
    .toDate()
    .optional({ nullable: true }),
  check('endDateTime', 'Must be a Date')
    .isISO8601()
    .toDate()
    .optional({ nullable: true }),
  check('organizerId', 'Must be a UUID').isUUID().optional(),
  check('latitude', 'Must be a Number').isNumeric().optional(),
  check('longitude', 'Must be a Number').isNumeric().optional(),
  validateJWT,
  validateCheck,
];
