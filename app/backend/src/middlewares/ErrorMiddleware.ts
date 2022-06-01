import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError } from 'jsonwebtoken';
import Messages from '../schemas/Messages';
import RequestError from '../utils/RequestError';

type ErrType = RequestError | JsonWebTokenError;

class ErrorMiddleware {
  public static handle(err: ErrType, _req: Request, res: Response, _next: NextFunction) {
    let status = StatusCodes.INTERNAL_SERVER_ERROR;
    let message: string = Messages.InternalServerError;

    if (err instanceof JsonWebTokenError) {
      status = StatusCodes.UNAUTHORIZED;
      message = Messages.TokenInvalid;
    }

    if (err instanceof RequestError && !!(err.status && err.message)) {
      status = err.status;
      message = err.message;
    }

    return res.status(status).json({ message });
  }
}

export default ErrorMiddleware;
