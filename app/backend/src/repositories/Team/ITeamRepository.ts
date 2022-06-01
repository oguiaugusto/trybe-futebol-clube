import { ITeam } from '../../interfaces/team';

export interface ITeamRepository {
  findAll: () => Promise<ITeam[]>;
  findById: (id: number) => Promise<ITeam | null>;
}
