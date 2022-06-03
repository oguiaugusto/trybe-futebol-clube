import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { expectedUpdatedMatchMock, updatableMatchMock, updatedMatchMock } from './mocks/match';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint PATCH /matches/:id', () => {
  const chaiHttpResponse = async (id: number, body?: string | object) => (
    chai.request(app).patch(`/matches/${id}`).send(body)
  );

  describe('On success', async () => {
    beforeEach(async () => {
      sinon.stub(Match, 'findByPk').resolves(updatedMatchMock);
      sinon.stub(Match.prototype, 'update').resolves(updatedMatchMock);
    });

    afterEach(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.prototype.update as sinon.SinonStub).restore();
    });

    it('should return the updated match object', async () => {
      const response = await chaiHttpResponse(updatedMatchMock.id, { homeTeamGoals: 1, awayTeamGoals: 2 });
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(expectedUpdatedMatchMock);
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      sinon.stub(Match.prototype, 'update').resolves(updatableMatchMock);
    });

    afterEach(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.prototype.update as sinon.SinonStub).restore();
    });

    it('should return an error message if provided id does not exist', async () => {
      const response = await chaiHttpResponse(123123, { homeTeamGoals: 1, awayTeamGoals: 2 });

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.MatchNotFound);
    });

    it('should return an error message if homeTeamGoals is not in the request body', async () => {
      const response = await chaiHttpResponse(updatedMatchMock.id, { awayTeamGoals: 2 });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('homeTeamGoals');
      expect(response.body.message).to.include('is required');
    });

    it('should return an error message if awayTeamGoals is not in the request body', async () => {
      const response = await chaiHttpResponse(updatedMatchMock.id, { homeTeamGoals: 1 });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('awayTeamGoals');
      expect(response.body.message).to.include('is required');
    });
  });
});
