import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { usersMock, usersMockPublic, usersPassword } from './mocks/user';
import JWTUser from '../utils/JWTUser';
import Messages from '../schemas/Messages';

chai.use(chaiHttp);

const { expect } = chai;



describe('Endpoint POST /login', () => {
  let chaiHttpResponse = async (body: string | object | undefined) => (
    chai.request(app).post('/login').send(body)
  );

  describe('On success', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(usersMock[0] as User);
    });
  
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('should return a user and a token if everything goes ok', async () => {
      const response = await chaiHttpResponse({ email: usersMock[0].email, password: usersPassword[0] });
  
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
      expect(response.body).to.be.eql({
        user: usersMockPublic[0],
        token: JWTUser.sign(usersMockPublic[0]),
      });
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });
  
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('should return an error message if email or password is not passed', async () => {
      const response = await chaiHttpResponse({});
  
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.FieldsNotFilled });
    });
  
    it('should return an error message if email or passoword length is not valid', async () => {
      const response = await chaiHttpResponse({ email: 'invalid_email', password: 'pas' });
  
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.WrongCredentials });
    });
  
    it('should return an error message if email is not in the database', async () => {
      const response = await chaiHttpResponse({ email: 'valid@not.indb', password: 'password' });
  
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.WrongCredentials });
    });
  
    it('should return an error message if email exists but password is wrong', async () => {
      (User.findOne as sinon.SinonStub).restore();
      sinon.stub(User, 'findOne').resolves(usersMock[0] as User);

      const response = await chaiHttpResponse({ email: usersMock[0].email, password: 'invalid_password' });
  
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.eql({ message: Messages.WrongCredentials });
    });
  });
});
