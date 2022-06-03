export interface IMatchUpdatableDTO {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchDTO extends IMatchUpdatableDTO {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}

export interface IMatch extends IMatchDTO {
  id: number;
}

export interface IMatchWithTeams extends IMatch, IMatchDTO {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
