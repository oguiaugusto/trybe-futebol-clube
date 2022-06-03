import sequelizeMatchRepository from '../../../repositories/Match';
import MatchUpdateController from './MatchUpdateController';
import MatchUpdateService from './MatchUpdateService';

const matchUpdateService = new MatchUpdateService(sequelizeMatchRepository);
const matchUpdateController = new MatchUpdateController(matchUpdateService);

export default matchUpdateController;
