import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { teamsMock } from './mocks/team';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /teams', () => {
  const chaiHttpResponse = async () => chai.request(app).get('/teams');

  describe('On success', () => {
    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('should return an array of teams', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      const response = await chaiHttpResponse();
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(teamsMock);
    });

    it('should return an empty array if there is not team', async () => {
      sinon.stub(Team, 'findAll').resolves([]);
      const response = await chaiHttpResponse();

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql([]);
    });
  });

  describe('On fail', () => {
    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('should return an error message if database throws an error instead of an empty array', async () => {
      sinon.stub(Team, 'findAll').rejects();
      const response = await chaiHttpResponse();

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.InternalServerError);
    });
  });
});
