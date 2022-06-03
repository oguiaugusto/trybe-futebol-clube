import Match from '../../database/models/Match';
import { IMatch, IMatchDTO, IMatchWithTeams } from '../../interfaces/match';

export interface IMatchRepository {
  findAll: () => Promise<IMatchWithTeams[]>;
  findAllByProgressCondition: (inProgress: boolean) => Promise<IMatchWithTeams[]>;
  create: (match: IMatchDTO) => Promise<IMatch>;
  // findById returns Match instead of IMatch because i'll use this return on finish service
  findById: (id: number) => Promise<Match | null>;
  finish: (match: Match) => Promise<IMatch>;
}
