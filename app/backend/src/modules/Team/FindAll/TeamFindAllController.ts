import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamFindAllService } from './TeamFindAllService';

class TeamFindAllController {
  constructor(private service: ITeamFindAllService) {
    this.service = service;
  }

  public handle = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.handle();

      return res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamFindAllController;
