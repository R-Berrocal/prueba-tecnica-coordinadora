export class ErrorObject extends Error {
  message: string;
  private statusCode: number;
  private status: string;
  private isOperational: boolean;
  private errors: any;

  constructor(message: string, statusCode: number, errors = []) {
    super();

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ErrorObject,
};
