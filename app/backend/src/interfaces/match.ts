export interface IMatchDTO {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IMatch {
  id: number;
  inProgress: boolean;
}

export interface IMatchWithTeams extends IMatch, IMatchDTO {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
