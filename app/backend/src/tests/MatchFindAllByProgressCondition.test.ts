import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesEndedMock, matchesInProgressMock } from './mocks/match';
import { StatusCodes } from 'http-status-codes';
import Messages from '../schemas/Messages';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /matches?inProgress=', () => {
  const chaiHttpResponse = async (progress?: string) => (
    chai.request(app).get(`/matches?inProgress=${progress}`)
  );

  describe('On success', () => {
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('should return an array of matches in progress', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesInProgressMock as unknown as Match[]);
      const response = await chaiHttpResponse('true');
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(matchesInProgressMock);
    });

    it('should return an array of ended matches', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesEndedMock as unknown as Match[]);
      const response = await chaiHttpResponse('false');
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(matchesEndedMock);
    });

    it('should return an empty array if there is no match in progress', async () => {
      sinon.stub(Match, 'findAll').resolves([]);
      const response = await chaiHttpResponse('true');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql([]);
    });

    it('should return an empty array if there is no ended match', async () => {
      sinon.stub(Match, 'findAll').resolves([]);
      const response = await chaiHttpResponse('false');

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
      const response = await chaiHttpResponse('true');

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.InternalServerError);
    });
  });
});
