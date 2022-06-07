import { ITeam } from '../../interfaces/team';
import { IMatch, IMatchWithTeams } from '../../interfaces/match';
import { ILeaderboard } from '../../interfaces/leaderboard';

interface ITotals {
  games: number;
  points: number;
  victories: number;
  draws: number;
  losses: number;
}

interface IGoals { favor: number; own: number; balance: number; }

class LeaderboardUtilities {
  public static getFilteredTeams(matches: IMatchWithTeams[], place: 'Home' | 'Away') {
    const filteredTeamNames: string[] = [];
    const filteredTeams: ITeam[] = [];

    matches.forEach(({ teamHome, teamAway }) => {
      const teamType = place === 'Home' ? teamHome : teamAway;

      if (!filteredTeamNames.includes(teamType.teamName) && teamType.id) {
        filteredTeams.push({ id: teamType.id, teamName: teamType.teamName });
        filteredTeamNames.push(teamType.teamName);
      }
    });

    return filteredTeams;
  }

  public static getMatchPoints(match: IMatch, teamId: number) {
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
  }

  public static getTotals(matches: IMatch[], teamId: number) {
    const totals: ITotals = { games: matches.length, points: 0, victories: 0, draws: 0, losses: 0 };

    matches.forEach((match) => {
      const matchPoints = this.getMatchPoints(match, teamId);

      if (matchPoints === 3) {
        totals.points += 3;
        totals.victories += 1;
      }
      if (matchPoints === 1) {
        totals.points += 1;
        totals.draws += 1;
      }
      if (matchPoints === 0) {
        totals.losses += 1;
      }
    });

    return totals;
  }

  public static getGoals(matches: IMatch[], teamId: number) {
    const goals = { favor: 0, own: 0, balance: 0 };

    matches.forEach((match) => {
      if (match.homeTeam === teamId) {
        goals.favor += match.homeTeamGoals;
        goals.own += match.awayTeamGoals;
      } else {
        goals.favor += match.awayTeamGoals;
        goals.own += match.homeTeamGoals;
      }
    });
    goals.balance = goals.favor - goals.own;

    return goals;
  }

  public static getEfficiency(totalPoints: number, totalGames: number) {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return parseFloat(efficiency.toFixed(2));
  }

  public static setUpLeaderboard(name: string, totals: ITotals, goals: IGoals) {
    const efficiency = LeaderboardUtilities.getEfficiency(totals.points, totals.games);

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
  }
}

export default LeaderboardUtilities;
