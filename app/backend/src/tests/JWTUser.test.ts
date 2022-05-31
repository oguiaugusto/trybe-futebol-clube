import { expect } from 'chai';
import { JsonWebTokenError } from 'jsonwebtoken';
import decode from 'jwt-decode';
import { IUserDecoded, IUserPublic } from '../interfaces/user';
import jwtUser from '../utils/JWTUser';

const user: IUserPublic = {
  id: 1,
  username: 'user123',
  role: 'user',
  email: 'user@email.com',
};

describe('Test JWTUser', () => {
  it('sign should return a token with encrypted user information', () => {
    const token = jwtUser.sign(user);

    expect(token).not.to.be.undefined;
    expect(typeof token === 'string').to.be.true;

    const decodedUser = decode<IUserDecoded>(token);
    expect(decodedUser.data).to.be.eql(user);
  });

  it('verify should return the user from the token passed as parameter', () => {
    const token = jwtUser.sign(user);
    const verifiedUser = jwtUser.verify(token);

    expect(verifiedUser).to.have.property('data');
    expect(verifiedUser.data).to.be.eql(user);
  });

  it('verify should throw an error if token is invalid', () => {
    try {
      jwtUser.verify('invalid_token');
    } catch (error) {
      expect(error).to.be.instanceOf(JsonWebTokenError);

      if (error instanceof JsonWebTokenError) {
        expect(error.name).to.be.equal('JsonWebTokenError');
        expect(error.message).to.be.equal('jwt malformed');
      }
    }
  });
});
