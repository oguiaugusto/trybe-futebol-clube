import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from './LeaderboardService';

class LeaderboardController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.handle();

      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
