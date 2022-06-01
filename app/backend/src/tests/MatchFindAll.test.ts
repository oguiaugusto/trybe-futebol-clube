import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesMock } from './mocks/match';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';
import { IMatchWithTeams } from '../interfaces/match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /matches', () => {
  const chaiHttpResponse = async () => chai.request(app).get('/matches');

  describe('On success', () => {
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('should return an array of matches', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);
      const response = await chaiHttpResponse();
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(matchesMock);
    });

    it('should return an empty array if there is no match', async () => {
      sinon.stub(Match, 'findAll').resolves([]);
      const response = await chaiHttpResponse();

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql([]);
    });
  });

  describe('On fail', () => {
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('should return an error message if database throws an error instead of an empty array', async () => {
      sinon.stub(Match, 'findAll').rejects();
      const response = await chaiHttpResponse();

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.InternalServerError);
    });
  });
});
