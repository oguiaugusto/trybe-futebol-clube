import { ITeam } from '../../interfaces/team';
import { IMatchWithTeams } from '../../interfaces/match';

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
}

export default LeaderboardUtilities;
