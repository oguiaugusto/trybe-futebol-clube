import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { userOutOfDb, usersMock, usersMockPublic } from './mocks/user';
import JWTUser from '../utils/JWTUser';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /login/validate', () => {
  const userToken = JWTUser.sign(usersMockPublic[0]);
  const adminToken = JWTUser.sign(usersMockPublic[2]);
  const outOfDbToken = JWTUser.sign(userOutOfDb);

  const chaiHttpResponse = async (token?: string) => {
    if (!token) {
      return chai.request(app).get('/login/validate');
    }
    return chai.request(app).get('/login/validate').set('Authorization', token);
  };

  describe('On success', () => {
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('should return "user" if correct user token is passed', async () => {
      sinon.stub(User, 'findOne').resolves(usersMock[0] as User);
      const response = await chaiHttpResponse(userToken);
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.equal('user');
    });
    
    it('should return "admin" if correct admin token is passed', async () => {
      sinon.stub(User, 'findOne').resolves(usersMock[2] as User);
      const response = await chaiHttpResponse(adminToken);
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.equal('admin');
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });
  
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('should return an error message if token is not passed', async () => {
      const response = await chaiHttpResponse();

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.TokenNotFound });
    });
    it('should return an error message if token is invalid', async () => {
      const response = await chaiHttpResponse('invalid_token');

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.TokenInvalid });
    });
    it('should return an error message if no user from token email is found', async () => {
      const response = await chaiHttpResponse(outOfDbToken);

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.NoTokenUser });
    });
  });
});
