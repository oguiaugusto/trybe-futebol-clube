import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../middlewares/Auth';

class LoginValidateController {
  public static handle = async (req: ReqWithUser, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      return res.status(StatusCodes.OK).json(user?.role);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginValidateController;
