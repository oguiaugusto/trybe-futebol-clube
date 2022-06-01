import sequelizeTeamRepository from '../../../repositories/Team';
import TeamFindByIdController from './TeamFindByIdController';
import TeamFindByIdService from './TeamFindByIdService';

const teamFindByIdService = new TeamFindByIdService(sequelizeTeamRepository);
const teamFindByIdController = new TeamFindByIdController(teamFindByIdService);

export default teamFindByIdController;
