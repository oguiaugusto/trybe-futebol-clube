import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import { ILeaderboard } from '../../../interfaces/leaderboard';
import { IMatch } from '../../../interfaces/match';
import Utils from '../../../utils/Utils';
import LeaderboardUtilities from '../LeaderboardUtilities';

export interface ILeaderboardHomeService {
  handle: () => Promise<ILeaderboard[]>;
}

class LeaderboardHomeService implements ILeaderboardHomeService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  private getHomeTeams = async () => {
    const matches = await this.repository.findAllByProgressCondition(false, true);

    const homeTeams = LeaderboardUtilities.getFilteredTeams(matches, 'Home');

    return homeTeams;
  };

  public handle = async () => {
    const homeTeams = await this.getHomeTeams();
    const leaderboardPromises = homeTeams.map(
      async ({ id, teamName }) => {
        const matches: IMatch[] = await this.repository.findEndedMatchesByTeam(id, 'Home');
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

export default LeaderboardHomeService;
