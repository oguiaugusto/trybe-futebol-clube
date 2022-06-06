import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import { ILeaderboard } from '../../../interfaces/leaderboard';
import { IMatch } from '../../../interfaces/match';
import Utils from '../../../utils/Utils';
import LeaderboardUtilities from '../LeaderboardUtilities';

export interface ILeaderboardService {
  handle: () => Promise<ILeaderboard[]>;
}

class LeaderboardService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  private getAllTeams = async () => {
    const matches = await this.repository.findAllByProgressCondition(false, true);

    // I'm passing "Home" as parameter because
    // all teams have matches at home and away.
    const allTeams = LeaderboardUtilities.getFilteredTeams(matches, 'Home');

    return allTeams;
  };

  public handle = async () => {
    const allTeams = await this.getAllTeams();
    const leaderboardPromises = allTeams.map(
      async ({ id, teamName }) => {
        const matches: IMatch[] = await this.repository.findEndedMatchesByTeam(id, 'Both');
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

export default LeaderboardService;
