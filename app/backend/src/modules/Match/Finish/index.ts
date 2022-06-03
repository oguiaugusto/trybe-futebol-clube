import sequelizeMatchRepository from '../../../repositories/Match';
import MatchFinishController from './MatchFinishController';
import MatchFinishService from './MatchFinishService';

const matchFinishService = new MatchFinishService(sequelizeMatchRepository);
const matchFinishController = new MatchFinishController(matchFinishService);

export default matchFinishController;
