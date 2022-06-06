import { IMatch } from '../../../interfaces/match';

const endedMatchesByTeam: IMatch[][] = [
  [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false
    },
    {
      id: 17,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 3,
      inProgress: false
    },
    {
      id: 40,
      homeTeam: 12,
      homeTeamGoals: 4,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false
    }
  ],
  [
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false
    },
    {
      id: 24,
      homeTeam: 10,
      homeTeamGoals: 2,
      awayTeam: 14,
      awayTeamGoals: 2,
      inProgress: false
    }
  ],
  [
    {
      id: 9,
      homeTeam: 1,
      homeTeamGoals: 0,
      awayTeam: 12,
      awayTeamGoals: 3,
      inProgress: false
    },
    {
      id: 30,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 12,
      awayTeamGoals: 4,
      inProgress: false
    }
  ],
  [
    {
      id: 12,
      homeTeam: 6,
      homeTeamGoals: 0,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: false
    },
    {
      id: 29,
      homeTeam: 9,
      homeTeamGoals: 0,
      awayTeam: 4,
      awayTeamGoals: 4,
      inProgress: false
    },
    {
      id: 38,
      homeTeam: 14,
      homeTeamGoals: 2,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: false
    }
  ]
];

// console.log(endedMatchesByTeam.filter((ms) => ms.every((m) => (
//   m.awayTeam === 4 || m.awayTeam === 8 || m.awayTeam === 12 || m.awayTeam === 14 
// ))));

export default endedMatchesByTeam;
