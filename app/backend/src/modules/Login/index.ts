import sequelizeUserRepository from '../../repositories/User';
import LoginService from './LoginService';
import jwtUser from '../../utils/JWTUser';
import LoginController from './LoginController';

const loginService = new LoginService(sequelizeUserRepository, jwtUser);
const loginController = new LoginController(loginService);

export default loginController;
