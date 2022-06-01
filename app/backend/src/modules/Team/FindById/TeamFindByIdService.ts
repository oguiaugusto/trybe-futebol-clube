import { StatusCodes } from 'http-status-codes';
import { ITeamRepository } from '../../../repositories/Team/ITeamRepository';
import { ITeam } from '../../../interfaces/team';
import RequestError from '../../../utils/RequestError';
import Messages from '../../../schemas/Messages';

export interface ITeamFindByIdService {
  handle: (id: number) => Promise<ITeam>;
}

class TeamFindByIdService {
  constructor(private repository: ITeamRepository) {
    this.repository = repository;
  }

  public handle = async (id: number) => {
    const team = await this.repository.findById(id);

    if (!team) throw new RequestError(StatusCodes.NOT_FOUND, Messages.TeamNotFound);
    return team;
  };
}

export default TeamFindByIdService;
