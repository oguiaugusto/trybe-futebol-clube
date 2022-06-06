import { ITeam } from '../../interfaces/team';
import { IMatch, IMatchWithTeams } from '../../interfaces/match';

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
}

export default LeaderboardUtilities;
