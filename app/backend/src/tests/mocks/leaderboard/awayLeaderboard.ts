import { ILeaderboard } from '../../../interfaces/leaderboard';

const expectedLeaderBoard: ILeaderboard[] = [
  {
    name: 'Palmeiras',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 0,
    goalsBalance: 7,
    efficiency: 100,
  },
  {
    name: 'Corinthians',
    totalPoints: 6,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 2,
    goalsBalance: 4,
    efficiency: 66.67,
  },
  {
    name: 'Grêmio',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 5,
    goalsOwn: 7,
    goalsBalance: -2,
    efficiency: 44.44,
  },
  {
    name: 'Santos',
    totalPoints: 2,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 2,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 3,
    goalsBalance: 0,
    efficiency: 33.33,
  },
]

export default expectedLeaderBoard;
