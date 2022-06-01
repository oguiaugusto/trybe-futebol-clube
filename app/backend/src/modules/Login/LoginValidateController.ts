import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../middlewares/Auth';

class LoginValidateController {
  public static handle = async (req: ReqWithUser, res: Response) => {
    const { user } = req;

    return res.status(StatusCodes.OK).json(user!.role);
  };
}

export default LoginValidateController;
