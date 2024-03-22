import { ErrorObject } from '../helpers/error';

// example of a service
export const getIndex = async () => {
  try {
    const getIndex = 'Hello World';
    if (!getIndex) {
      throw new ErrorObject('No index found', 404);
    }
    return getIndex;
  } catch (error: any) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
