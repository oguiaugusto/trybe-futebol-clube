import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RequestError from '../utils/RequestError';

type ErrType = RequestError;

class ErrorMiddleware {
  public static handle(err: ErrType, _req: Request, res: Response, _next: NextFunction) {
    let status = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (err.message || err.status) {
      status = err.status;
      message = err.message;
    }

    return res.status(status).json({ message });
  }
}

export default ErrorMiddleware;
