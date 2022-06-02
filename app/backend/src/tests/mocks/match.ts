import { IMatchWithTeams } from '../../interfaces/match';

const matchesMock: IMatchWithTeams[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Corinthians'
    },
    teamAway: {
      teamName: 'Napoli-SC'
    }
  },{
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
];

const matchesInProgressMock = matchesMock.filter((match) => match.inProgress);
const matchesEndedMock = matchesMock.filter((match) => !match.inProgress);

export {
  matchesMock,
  matchesInProgressMock,
  matchesEndedMock,
}
