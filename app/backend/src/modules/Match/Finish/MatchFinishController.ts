import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchFinishService } from './MatchFinishService';
import Messages from '../../../schemas/Messages';

class MatchFinishController {
  constructor(private service: IMatchFinishService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.handle(parseInt(id, 10));

      return res.status(StatusCodes.OK).json({ message: Messages.Finished });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchFinishController;
