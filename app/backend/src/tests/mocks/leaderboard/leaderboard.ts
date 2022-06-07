import { ILeaderboard } from '../../../interfaces/leaderboard';

const expectedLeaderBoard: ILeaderboard[] = [
  {
    name: 'Palmeiras',
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67
  },
  {
    name: 'Corinthians',
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80
  },
  {
    name: 'Santos',
    totalPoints: 11,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 2,
    totalLosses: 0,
    goalsFavor: 12,
    goalsOwn: 6,
    goalsBalance: 6,
    efficiency: 73.33
  },
  {
    name: 'Grêmio',
    totalPoints: 10,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 9,
    goalsOwn: 8,
    goalsBalance: 1,
    efficiency: 66.67
  },
];

export default expectedLeaderBoard;