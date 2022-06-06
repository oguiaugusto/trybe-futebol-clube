import { ILeaderboard } from '../../interfaces/leaderboard';

const rawOtherInfos = { totalGames: 0, totalDraws: 0, totalLosses: 0, efficiency: 10.10 };

const palmeiras: ILeaderboard = {
  ...rawOtherInfos,
  name: 'Palmeiras',
  totalVictories: 5,
  totalPoints: 10,
  goalsBalance: 9,
  goalsFavor: 10,
  goalsOwn: 1,
};
const corinthians: ILeaderboard = {
  ...rawOtherInfos,
  name: 'Corinthians',
  totalVictories: 3,
  totalPoints: 8,
  goalsBalance: 5,
  goalsFavor: 8,
  goalsOwn: 2,
};
const santos: ILeaderboard = {
  ...rawOtherInfos,
  name: 'Santos',
  totalVictories: 2,
  totalPoints: 7,
  goalsBalance: 4,
  goalsFavor: 6,
  goalsOwn: 3,
};

export {
  rawOtherInfos,
  palmeiras,
  corinthians,
  santos,
};
