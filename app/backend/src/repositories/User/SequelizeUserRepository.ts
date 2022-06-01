import User from '../../database/models/User';
import { IUserRepository } from './IUserRepository';

class SequelizeUserRepository implements IUserRepository {
  private client: typeof User;

  constructor() {
    this.client = User;
  }

  findByEmail = async (email: string) => {
    const user = await this.client.findOne({ where: { email } });
    return user;
  };
}

export default SequelizeUserRepository;
