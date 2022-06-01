import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Messages from '../schemas/Messages';
import RequestError from '../utils/RequestError';
import Utils from '../utils/Utils';

class LoginValidations {
  public static handle = async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new RequestError(StatusCodes.BAD_REQUEST, Messages.FieldsNotFilled);
      }

      if (
        typeof email !== 'string'
        || !Utils.checkEmail(email)
        || typeof password !== 'string'
        || password.length <= 6
      ) {
        throw new RequestError(StatusCodes.UNAUTHORIZED, Messages.WrongCredentials);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default LoginValidations;
