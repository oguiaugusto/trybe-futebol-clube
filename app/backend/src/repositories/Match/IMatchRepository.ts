import Match from '../../database/models/Match';
import { IMatch, IMatchDTO, IMatchUpdatableDTO, IMatchWithTeams } from '../../interfaces/match';

export interface IMatchRepository {
  findAll: () => Promise<IMatchWithTeams[]>;
  findAllByProgressCondition: (inProgress: boolean, includeAllTeamAttributes?: boolean) =>
  Promise<IMatchWithTeams[]>;
  create: (match: IMatchDTO) => Promise<IMatch>;

  // findById returns Match instead of IMatch because i'll use this return on finish service
  findById: (id: number) => Promise<Match | null>;

  finish: (match: Match) => Promise<IMatch>;
  updateGoals: (match: Match, matchGoals: IMatchUpdatableDTO) => Promise<IMatch>;
  findEndedMatchesByTeam: (teamId: number) => Promise<IMatch[]>
}
