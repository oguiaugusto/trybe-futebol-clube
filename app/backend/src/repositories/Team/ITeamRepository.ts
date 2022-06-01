import { ITeam } from '../../interfaces/team';

export interface ITeamRepository {
  findAll: () => Promise<ITeam[]>
}
