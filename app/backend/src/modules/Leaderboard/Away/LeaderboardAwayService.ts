import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import { ILeaderboard } from '../../../interfaces/leaderboard';
import { IMatch } from '../../../interfaces/match';
import Utils from '../../../utils/Utils';
import LeaderboardUtilities from '../LeaderboardUtilities';

export interface ILeaderboardAwayService {
  handle: () => Promise<ILeaderboard[]>;
}

class LeaderboardAwayService implements ILeaderboardAwayService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  private getAwayTeams = async () => {
    const matches = await this.repository.findAllByProgressCondition(false, true);

    const awayTeams = LeaderboardUtilities.getFilteredTeams(matches, 'Away');

    return awayTeams;
  };

  public handle = async () => {
    const awayTeams = await this.getAwayTeams();
    const leaderboardPromises = awayTeams.map(
      async ({ id, teamName }) => {
        const matches: IMatch[] = await this.repository.findEndedMatchesByTeam(id, 'Away');
        const totals = LeaderboardUtilities.getTotals(matches, id);
        const goals = LeaderboardUtilities.getGoals(matches, id);

        return LeaderboardUtilities.setUpLeaderboard(teamName, totals, goals);
      },
    );

    const leaderboard = await Promise.all(leaderboardPromises);
    const sortedLeaderboard = Utils.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  };
}

export default LeaderboardAwayService;
