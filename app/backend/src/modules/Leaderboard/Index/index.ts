import sequelizeMatchRepository from '../../../repositories/Match';
import LeaderboardController from './LeaderboardController';
import LeaderboardService from './LeaderboardService';

const leaderboardService = new LeaderboardService(sequelizeMatchRepository);
const leaderboardController = new LeaderboardController(leaderboardService);

export default leaderboardController;
