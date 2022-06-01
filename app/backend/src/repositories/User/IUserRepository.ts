import { IUser } from '../../interfaces/user';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<IUser | null>;
}
