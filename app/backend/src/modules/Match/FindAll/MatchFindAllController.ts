import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchFindAllService } from './MatchFindAllService';

class MatchFindAllController {
  constructor(private service: IMatchFindAllService) {
    this.service = service;
  }

  public handle = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.handle();

      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchFindAllController;
