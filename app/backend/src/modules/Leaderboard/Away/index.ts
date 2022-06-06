import sequelizeMatchRepository from '../../../repositories/Match';
import LeaderboardAwayController from './LeaderboardAwayController';
import LeaderboardAwayService from './LeaderboardAwayService';

const leaderboardAwayService = new LeaderboardAwayService(sequelizeMatchRepository);
const leaderboardAwayController = new LeaderboardAwayController(leaderboardAwayService);

export default leaderboardAwayController;
