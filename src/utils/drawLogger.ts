import { Request } from 'express';
import logger from './logger';


export const drawLogger = (
  level: number,
  message: Error | string,
  req?: Request,
  isHttp?: boolean
): void => {
  if (isHttp && req) {
    message = `
    method : ${req.method} url : ${req.originalUrl} ip : ${req.ip}
    message :  ${typeof message === 'object' ? message.message : message}
    ${
      req.method !== 'GET' && level !== 1
        ? `body: ${JSON.stringify(req.body, null, 2)}`
        : ''
    }
   `;
  }

  switch (process.env.LOG_LEVEL || '4') {
    case '1':
      if (level === 1) logger.error(message);
      break;
    case '2':
      if (level === 1) logger.error(message);
      if (level === 2) logger.info(message);
      break;
    case '3':
      if (level === 1) logger.error(message);
      if (level === 2) logger.info(message);
      if (level === 3) logger.verbose(message);
      break;
    case '4':
      if (level === 1) logger.error(message);
      if (level === 2) logger.info(message);
      if (level === 3) logger.verbose(message);
      if (level === 4) logger.debug(message);
      break;
  }
};
