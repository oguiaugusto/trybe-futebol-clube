import { ITeam } from '../../interfaces/team';
import { IMatch, IMatchWithTeams } from '../../interfaces/match';

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
    console.log(filteredTeams);

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
    const matchPointsEqualsToThanReturn = (match: IMatch, eqNumber: number, rtNum: number) => (
      LeaderboardUtilities.getMatchPoints(match, teamId) === eqNumber ? rtNum : 0
    );
    const games = matches.length;
    const points = matches.reduce((total: number, match: IMatch) => (
      total + LeaderboardUtilities.getMatchPoints(match, teamId)
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
  }

  public static getGoals(matches: IMatch[], teamId: number) {
    const favor = matches.reduce((total: number, match: IMatch) => (
      total + (match.homeTeam === teamId ? match.homeTeamGoals : match.awayTeamGoals)
    ), 0);
    const own = matches.reduce((total: number, match: IMatch) => (
      total + (match.homeTeam === teamId ? match.awayTeamGoals : match.homeTeamGoals)
    ), 0);
    const balance = favor - own;

    return { favor, own, balance } as IGoals;
  }
}

export default LeaderboardUtilities;
