import { expect } from 'chai';
import { ILeaderboard } from '../interfaces/leaderboard';
import { palmeiras, corinthians, santos } from './mocks/sortLeaderboards';
import Utils from '../utils/Utils';

describe('Test Utils.sortLeaderboard', () => {
  it('should return sorted leaderboard by total points', () => {
    const team1 = palmeiras;
    const team2 = corinthians;
    const team3 = santos;

    const sortedLeaderboard = Utils.sortLeaderboard([team2, team3, team1]);

    expect(sortedLeaderboard).to.be.eql([team1, team2, team3]);
  });

  it('should return sorted leaderboard by victories if total points are the same', () => {
    const team1: ILeaderboard = { ...palmeiras, totalPoints: 10 };
    const team2: ILeaderboard = { ...corinthians, totalPoints: 10 };
    const team3: ILeaderboard = { ...santos, totalPoints: 10 };

    const sortedLeaderboard = Utils.sortLeaderboard([team2, team3, team1]);

    expect(sortedLeaderboard).to.be.eql([team1, team2, team3]);
  });

  it('should return sorted leaderboard by goals balance if total points and victories are the same', () => {
    const team1: ILeaderboard = { ...palmeiras, totalPoints: 10, totalVictories: 5 };
    const team2: ILeaderboard = { ...corinthians, totalPoints: 10, totalVictories: 5 };
    const team3: ILeaderboard = { ...santos, totalPoints: 10, totalVictories: 5 };

    const sortedLeaderboard = Utils.sortLeaderboard([team2, team3, team1]);

    expect(sortedLeaderboard).to.be.eql([team1, team2, team3]);
  });

  it('should return sorted leaderboard by goals in favor if total points, victories and goals balance are the same', () => {
    const team1: ILeaderboard = { ...palmeiras, totalPoints: 10, totalVictories: 5, goalsBalance: 9 };
    const team2: ILeaderboard = { ...corinthians, totalPoints: 10, totalVictories: 5, goalsBalance: 9 };
    const team3: ILeaderboard = { ...santos, totalPoints: 10, totalVictories: 5, goalsBalance: 9 };

    const sortedLeaderboard = Utils.sortLeaderboard([team2, team3, team1]);

    expect(sortedLeaderboard).to.be.eql([team1, team2, team3]);
  });

  it('should return sorted leaderboard by goals owned if total points, victories, goals balance and goals in favor are the same', () => {
    const team1: ILeaderboard = { ...palmeiras, totalPoints: 10, totalVictories: 5, goalsBalance: 9, goalsFavor: 2 };
    const team2: ILeaderboard = { ...corinthians, totalPoints: 10, totalVictories: 5, goalsBalance: 9, goalsFavor: 2 };
    const team3: ILeaderboard = { ...santos, totalPoints: 10, totalVictories: 5, goalsBalance: 9, goalsFavor: 2 };

    const sortedLeaderboard = Utils.sortLeaderboard([team2, team3, team1]);

    expect(sortedLeaderboard).to.be.eql([team1, team2, team3]);
  });
});
