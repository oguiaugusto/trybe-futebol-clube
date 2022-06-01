import Team from '../../database/models/Team';
import { ITeamRepository } from './ITeamRepository';

class SequelizeTeamRepository implements ITeamRepository {
  private client: typeof Team;

  constructor() {
    this.client = Team;
  }

  findAll = async () => {
    const teams = await this.client.findAll();
    return teams;
  };

  findById = async (id: number) => {
    const team = await this.client.findByPk(id);
    return team;
  };
}

export default SequelizeTeamRepository;
