import { ILeaderboard } from '../../../interfaces/leaderboard';

const expectedLeaderBoard: ILeaderboard[] = [
  {
    name: 'Santos',
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: 100,
  },
  {
    name: 'Corinthians',
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 8,
    goalsOwn: 2,
    goalsBalance: 6,
    efficiency: 100,
  },
  {
    name: 'Palmeiras',
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 10,
    goalsOwn: 5,
    goalsBalance: 5,
    efficiency: 77.78,
  },
  {
    name: 'Grêmio',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 1,
    goalsBalance: 3,
    efficiency: 100,
  },
];

export default expectedLeaderBoard;