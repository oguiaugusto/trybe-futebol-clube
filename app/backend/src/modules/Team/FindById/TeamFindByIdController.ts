import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamFindByIdService } from './TeamFindByIdService';

class TeamFindByIdController {
  constructor(private service: ITeamFindByIdService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.handle(parseInt(id, 10));

      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamFindByIdController;
