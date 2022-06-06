import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import { ILeaderboard } from '../../../interfaces/leaderboard';
import { IMatch } from '../../../interfaces/match';
import Utils from '../../../utils/Utils';
import LeaderboardUtilities from '../LeaderboardUtilities';

export interface ILeaderboardHomeService {
  handle: () => Promise<ILeaderboard[]>;
}

interface ITotals {
  games: number;
  points: number;
  victories: number;
  draws: number;
  losses: number;
}

interface IGoals { favor: number; own: number; balance: number; }

class LeaderboardHomeService implements ILeaderboardHomeService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  private getHomeTeams = async () => {
    const matches = await this.repository.findAllByProgressCondition(false, true);

    const homeTeams = LeaderboardUtilities.getFilteredTeams(matches, 'Home');

    return homeTeams;
  };

  private getGoals = (matches: IMatch[], teamId: number) => {
    const favor = matches.reduce((total: number, match: IMatch) => (
      total + (match.homeTeam === teamId ? match.homeTeamGoals : match.awayTeamGoals)
    ), 0);
    const own = matches.reduce((total: number, match: IMatch) => (
      total + (match.homeTeam === teamId ? match.awayTeamGoals : match.homeTeamGoals)
    ), 0);
    const balance = favor - own;

    return { favor, own, balance } as IGoals;
  };

  private getEfficiency = (totalPoints: number, totalGames: number) => {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return parseFloat(efficiency.toFixed(2));
  };

  private setUpLeaderboard = (name: string, totals: ITotals, goals: IGoals) => {
    const efficiency = this.getEfficiency(totals.points, totals.games);

    return {
      name,
      totalPoints: totals.points,
      totalGames: totals.games,
      totalVictories: totals.victories,
      totalDraws: totals.draws,
      totalLosses: totals.losses,
      goalsFavor: goals.favor,
      goalsOwn: goals.own,
      goalsBalance: goals.balance,
      efficiency,
    } as ILeaderboard;
  };

  public handle = async () => {
    const homeTeams = await this.getHomeTeams();
    const leaderboardPromises = homeTeams.map(
      async ({ id, teamName }) => {
        const matches: IMatch[] = await this.repository.findEndedMatchesByTeam(id, 'Home');
        const totals = LeaderboardUtilities.getTotals(matches, id);
        const goals = this.getGoals(matches, id);

        return this.setUpLeaderboard(teamName, totals, goals);
      },
    );

    const leaderboard = await Promise.all(leaderboardPromises);
    const sortedLeaderboard = Utils.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  };
}

export default LeaderboardHomeService;
