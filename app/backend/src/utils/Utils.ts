import { ILeaderboard } from '../interfaces/leaderboard';

class Utils {
  public static checkEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    return !!email.match(emailRegex);
  }

  public static sortLeaderboard(leaderboard: ILeaderboard[]) {
    const sorted = leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }

      return b.totalPoints - a.totalPoints;
    });

    return sorted;
  }
}

export default Utils;
