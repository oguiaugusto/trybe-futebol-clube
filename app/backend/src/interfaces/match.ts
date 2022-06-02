export interface IMatchDTO {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatch extends IMatchDTO {
  id: number;
}

export interface IMatchWithTeams extends IMatch, IMatchDTO {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
