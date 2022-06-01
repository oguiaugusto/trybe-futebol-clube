export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchWithTeams extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
