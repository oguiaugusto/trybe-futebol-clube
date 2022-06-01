import sequelizeTeamRepository from '../../../repositories/Team';
import TeamFindAllService from './TeamFindAllService';
import TeamFindAllController from './TeamFindAllController';

const teamFindAllService = new TeamFindAllService(sequelizeTeamRepository);
const teamFindAllController = new TeamFindAllController(teamFindAllService);

export default teamFindAllController;
