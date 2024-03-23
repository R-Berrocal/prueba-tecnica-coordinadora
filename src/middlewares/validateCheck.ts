import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { drawLogger } from '../utils/drawLogger';

export const validateCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  drawLogger(3, 'request-info', req, true);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    drawLogger(1, 'Error - Invalid request parameters');
    drawLogger(1, JSON.stringify(errors, null, ' '));
    return res.status(400).json({
      status: 400,
      message: 'Error- Invalid request parameters',
      errors: errors.array(),
    });
  }
  return next();
};
