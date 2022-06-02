import { StatusCodes } from 'http-status-codes';
import { compareSync } from 'bcryptjs';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { IUserCredentials, IUserLogged } from '../../interfaces/user';
import { IEncrypter } from '../../interfaces/encrypter';
import RequestError from '../../utils/RequestError';
import Messages from '../../schemas/Messages';

export interface ILoginService {
  handle: (credentials: IUserCredentials) => Promise<IUserLogged>;
}

class LoginService implements ILoginService {
  constructor(
    private repository: IUserRepository,
    private encrypter: IEncrypter,
  ) {
    this.repository = repository;
  }

  public handle = async ({ email, password }: IUserCredentials) => {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new RequestError(StatusCodes.UNAUTHORIZED, Messages.WrongCredentials);

    const validPassword = compareSync(password, user.password);
    if (!validPassword) throw new RequestError(StatusCodes.UNAUTHORIZED, Messages.WrongCredentials);

    const userPublic = { id: user.id, username: user.username, role: user.role, email: user.email };
    const token = this.encrypter.sign(userPublic);

    return { user: userPublic, token };
  };
}

export default LoginService;
