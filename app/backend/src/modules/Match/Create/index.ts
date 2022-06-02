import sequelizeMatchRepository from '../../../repositories/Match';
import sequelizeTeamRepository from '../../../repositories/Team';
import MatchCreateController from './MatchCreateController';
import MatchCreateService from './MatchCreateService';

const matchCreateService = new MatchCreateService(
  sequelizeMatchRepository,
  sequelizeTeamRepository,
);
const matchCreateController = new MatchCreateController(matchCreateService);

export default matchCreateController;
