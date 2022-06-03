import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchUpdateService } from './MatchUpdateService';

class MatchUpdateController {
  constructor(private service: IMatchUpdateService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: { homeTeamGoals, awayTeamGoals }, params: { id } } = req;
      const match = await this.service.handle(parseInt(id, 10), { homeTeamGoals, awayTeamGoals });

      return res.status(StatusCodes.OK).json(match);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchUpdateController;
