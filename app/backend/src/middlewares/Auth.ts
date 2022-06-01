import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserRepository } from '../repositories/User/IUserRepository';
import { IUser } from '../interfaces/user';
import RequestError from '../utils/RequestError';
import JWTUser from '../utils/JWTUser';
import Messages from '../schemas/Messages';
import sequelizeUserRepository from '../repositories/User';

export interface ReqWithUser extends Request { user?: IUser }

class Auth {
  constructor(private repository: IUserRepository) {
    this.repository = repository;
  }

  public handle = async (req: ReqWithUser, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, Messages.TokenNotFound);

      const { data: { email } } = JWTUser.verify(token);
      const user = await this.repository.findByEmail(email);

      if (!user) throw new RequestError(StatusCodes.UNAUTHORIZED, Messages.NoTokenUser);
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default new Auth(sequelizeUserRepository);
