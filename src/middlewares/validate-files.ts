import { Response } from 'express';

const validFiles = ['xls', 'xlsx'];

export const validateFiles = (req: any, res: Response, next: Function) => {
  const extensionFile = req.files?.events?.name.split('.').pop();
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !validFiles.includes(extensionFile)
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Error - Invalid files',
    });
  }

  next();
};
