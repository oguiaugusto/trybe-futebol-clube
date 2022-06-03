import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchCreateService } from './MatchCreateService';

class MatchCreateController {
  constructor(private service: IMatchCreateService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this.service.handle({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
      });

      return res.status(StatusCodes.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchCreateController;
