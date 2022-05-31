import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IEncrypter } from '../../interfaces/encrypter';
import { IUserDecoded, IUserPublic } from '../../interfaces/user';

class JWTUser implements IEncrypter {
  constructor(
    private secret: string,
    private options: SignOptions,
  ) {
    this.secret = secret;
    this.options = options;
  }

  public sign(user: IUserPublic) {
    return sign({ data: user }, this.secret, this.options);
  }

  public verify(userToken: string) {
    return verify(userToken, this.secret) as IUserDecoded;
  }
}

export default JWTUser;
