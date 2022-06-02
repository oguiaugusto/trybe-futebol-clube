import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchFindAllService } from './MatchFindAllService';

class MatchFindAllController {
  constructor(private service: IMatchFindAllService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { inProgress } = req.query;

      if (typeof inProgress !== 'string' || inProgress === undefined) {
        inProgress = undefined;
      }

      const matches = await this.service.handle(inProgress);

      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchFindAllController;
