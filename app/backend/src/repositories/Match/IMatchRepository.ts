import { IMatch, IMatchDTO, IMatchWithTeams } from '../../interfaces/match';

export interface IMatchRepository {
  findAll: () => Promise<IMatchWithTeams[]>;
  findAllByProgressCondition: (inProgress: boolean) => Promise<IMatchWithTeams[]>;
  create: (match: IMatchDTO) => Promise<IMatch>;
}
