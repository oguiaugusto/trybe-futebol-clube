import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from './LoginService';

class LoginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userLogged = await this.service.handle({ email, password });

      return res.status(StatusCodes.OK).json(userLogged);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
