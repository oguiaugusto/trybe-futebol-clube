import sequelizeMatchRepository from '../../../repositories/Match';
import MatchFindAllController from './MatchFindAllController';
import MatchFindAllService from './MatchFindAllService';

const matchFindAllService = new MatchFindAllService(sequelizeMatchRepository);
const matchFindAllController = new MatchFindAllController(matchFindAllService);

export default matchFindAllController;
