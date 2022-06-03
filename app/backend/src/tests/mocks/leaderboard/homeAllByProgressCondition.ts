import { IMatchWithTeams } from '../../../interfaces/match';

const allByProgressCondition: IMatchWithTeams[] = [
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: { teamName: 'Corinthians', id: 4 },
    teamAway: { teamName: '', id: 11 }
  },
  {
    id: 7,
    homeTeam: 12,
    homeTeamGoals: 2,
    awayTeam: 6,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: { teamName: 'Palmeiras', id: 12 },
    teamAway: { teamName: '', id: 6 }
  },
  {
    id: 13,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 5,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Grêmio', id: 8 },
    teamAway: { teamName: '', id: 5 }
  },
  {
    id: 14,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Santos', id: 14 },
    teamAway: { teamName: '', id: 16 }
  },
  {
    id: 18,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 5,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: { teamName: 'Palmeiras', id: 12 },
    teamAway: { teamName: '', id: 5 }
  },
  {
    id: 22,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Corinthians', id: 4 },
    teamAway: { teamName: '', id: 3 }
  },
  {
    id: 31,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: { teamName: 'Grêmio', id: 8 },
    teamAway: { teamName: '', id: 10 }
  },
  {
    id: 32,
    homeTeam: 14,
    homeTeamGoals: 5,
    awayTeam: 11,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Santos', id: 14 },
    teamAway: { teamName: '', id: 11 }
  },
  {
    id: 38,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Santos', id: 14 },
    teamAway: { teamName: '', id: 4 }
  },
  {
    id: 40,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Palmeiras', id: 12 },
    teamAway: { teamName: '', id: 8 }
  },
  {
    id: 49,
    homeTeam: 4,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'Corinthians', id: 4 },
    teamAway: { teamName: '', id: 9 }
  }
];

// console.log(allByProgressCondition.filter((m) => (
//   m.teamHome.id === 4 || m.teamHome.id === 8 || m.teamHome.id === 12 || m.teamHome.id === 14
// )));

export default allByProgressCondition;
