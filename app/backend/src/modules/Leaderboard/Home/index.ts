import sequelizeMatchRepository from '../../../repositories/Match';
import LeaderboardHomeController from './LeaderboardHomeController';
import LeaderboardHomeService from './LeaderboardHomeService';

const leaderboardHomeService = new LeaderboardHomeService(sequelizeMatchRepository);
const leaderboardHomeController = new LeaderboardHomeController(leaderboardHomeService);

export default leaderboardHomeController;
