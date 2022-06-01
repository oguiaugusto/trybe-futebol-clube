import User from '../../database/models/User';
import { IUserRepository } from './IUserRepository';

class SequelizeUserRepository implements IUserRepository {
  findByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user;
  };
}

export default SequelizeUserRepository;
