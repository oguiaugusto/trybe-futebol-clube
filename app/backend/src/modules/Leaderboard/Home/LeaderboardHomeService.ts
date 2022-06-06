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

  private getMatchPoints = (match: IMatch, teamId: number) => {
    let teamGoals: number;
    let rivalGoals: number;

    if (match.homeTeam === teamId) {
      teamGoals = match.homeTeamGoals;
      rivalGoals = match.awayTeamGoals;
    } else {
      teamGoals = match.awayTeamGoals;
      rivalGoals = match.homeTeamGoals;
    }

    if (teamGoals > rivalGoals) return 3;
    if (teamGoals === rivalGoals) return 1;
    return 0;
  };

  private getTotals = (matches: IMatch[], teamId: number) => {
    const matchPointsEqualsToThanReturn = (match: IMatch, eqNumber: number, rtNum: number) => (
      this.getMatchPoints(match, teamId) === eqNumber ? rtNum : 0
    );
    const games = matches.length;
    const points = matches.reduce((total: number, match: IMatch) => (
      total + this.getMatchPoints(match, teamId)
    ), 0);
    const victories = matches.reduce((total: number, match: IMatch) => (
      total + matchPointsEqualsToThanReturn(match, 3, 1)
    ), 0);
    const draws = matches.reduce((total: number, match: IMatch) => (
      total + matchPointsEqualsToThanReturn(match, 1, 1)
    ), 0);
    const losses = matches.reduce((total: number, match) => (
      total + matchPointsEqualsToThanReturn(match, 0, 1)
    ), 0);

    return { games, points, victories, draws, losses } as ITotals;
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
        const totals = this.getTotals(matches, id);
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
