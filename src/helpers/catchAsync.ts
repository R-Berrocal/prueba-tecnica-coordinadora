import { Request, Response } from 'express';

export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: Function) => {
    fn(req, res, next).catch(next);
  };
