import { IMatchWithTeams } from '../../interfaces/match';

export interface IMatchRepository {
  findAll: () => Promise<IMatchWithTeams[]>;
}
