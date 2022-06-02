import { IMatch, IMatchDTO, IMatchWithTeams } from '../../interfaces/match';

const matchesDTOMock: IMatchDTO[] = [
  { homeTeam: 16, homeTeamGoals: 1, awayTeam: 8, awayTeamGoals: 1 },
  { homeTeam: 9, homeTeamGoals: 1, awayTeam: 14, awayTeamGoals: 1 },
  { homeTeam: 4, homeTeamGoals: 3, awayTeam: 11, awayTeamGoals: 0 },
  { homeTeam: 3, homeTeamGoals: 0, awayTeam: 2, awayTeamGoals: 0 }
];

const matchesMock: IMatch[] = [
  { id: 1, ...matchesDTOMock[0], inProgress: false },
  { id: 2, ...matchesDTOMock[1], inProgress: false },
  { id: 3, ...matchesDTOMock[2], inProgress: true },
  { id: 4, ...matchesDTOMock[3], inProgress: true },
];

const matchesWithTeamsMock: IMatchWithTeams[] = [
  {
    ...matchesMock[0],
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    ...matchesMock[1],
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    },
  },
  {
    ...matchesMock[2],
    teamHome: {
      teamName: 'Corinthians'
    },
    teamAway: {
      teamName: 'Napoli-SC'
    },
  },
  {
    ...matchesMock[3],
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Bahia'
    },
  },
];

const matchesInProgressMock = matchesWithTeamsMock.filter((match) => match.inProgress);
const matchesEndedMock = matchesWithTeamsMock.filter((match) => !match.inProgress);

const matchWithInvalidTeams: IMatchDTO = {
  homeTeam: 123123,
  awayTeam: 1,
  awayTeamGoals: 0,
  homeTeamGoals: 0,
};

export {
  matchesDTOMock,
  matchesMock,
  matchesWithTeamsMock,
  matchesInProgressMock,
  matchesEndedMock,
  matchWithInvalidTeams,
}
