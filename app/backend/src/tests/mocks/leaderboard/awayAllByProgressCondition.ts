import { IMatchWithTeams } from '../../../interfaces/match';

const allByProgressCondition: IMatchWithTeams[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: '', id: 16 },
    teamAway: { teamName: 'Grêmio', id: 8 }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: '', id: 9 },
    teamAway: { teamName: 'Santos', id: 14 }
  },
  {
    id: 9,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: { teamName: '', id: 1 },
    teamAway: { teamName: 'Palmeiras', id: 12 }
  },
  {
    id: 12,
    homeTeam: 6,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: '', id: 6 },
    teamAway: { teamName: 'Corinthians', id: 4 }
  },
  {
    id: 17,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: { teamName: '', id: 1 },
    teamAway: { teamName: 'Grêmio', id: 8 }
  },
  {
    id: 24,
    homeTeam: 10,
    homeTeamGoals: 2,
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: { teamName: '', id: 10 },
    teamAway: { teamName: 'Santos', id: 14 }
  },
  {
    id: 29,
    homeTeam: 9,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 4,
    inProgress: false,
    teamHome: { teamName: '', id: 9 },
    teamAway: { teamName: 'Corinthians', id: 4 }
  },
  {
    id: 30,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 4,
    inProgress: false,
    teamHome: { teamName: '', id: 3 },
    teamAway: { teamName: 'Palmeiras', id: 12 }
  },
  {
    id: 38,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: '', id: 14 },
    teamAway: { teamName: 'Corinthians', id: 4 }
  },
  {
    id: 40,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: '', id: 12 },
    teamAway: { teamName: 'Grêmio', id: 8 }
  }
];

// console.log(allByProgressCondition.filter((m) => (
//   m.teamAway.id === 4 || m.teamAway.id === 8 || m.teamAway.id === 12 || m.teamAway.id === 14
// )));

export default allByProgressCondition;
