import { ITeam } from '../../../interfaces/team';
import { ITeamRepository } from '../../../repositories/Team/ITeamRepository';

export interface ITeamFindAllService {
  handle: () => Promise<ITeam[]>;
}

class TeamFindAllService implements ITeamFindAllService {
  constructor(private repository: ITeamRepository) {
    this.repository = repository;
  }

  public handle = async () => {
    const teams = await this.repository.findAll();

    return teams;
  };
}

export default TeamFindAllService;
