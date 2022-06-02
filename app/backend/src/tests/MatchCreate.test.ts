import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesDTOMock, matchesMock, matchWithInvalidTeams } from './mocks/match';
import { teamsMock } from './mocks/team';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint POST /matches', () => {
  const chaiHttpResponse = async (body?: string | object) => (
    chai.request(app).post('/matches').send(body)
  );

  describe('On success', () => {
    beforeEach(async () => {
      // Sinon's not letting me stub 2 different promises of the same function
      // so, let's pretend that it's returning 2 teams instead of one, =)
      sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);

      sinon.stub(Match, 'create').resolves(matchesMock[0] as Match);
    });

    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('should return the match object', async () => {
      const response = await chaiHttpResponse(matchesDTOMock[0]);
  
      expect(response.status).to.be.equal(StatusCodes.CREATED);
      expect(response.body).to.be.eql(matchesMock[0]);
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      // Just as the success mock, this won't "find", both teams...
      sinon.stub(Team, 'findByPk').resolves(null);
      sinon.stub(Match, 'create').resolves(undefined);
    });

    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('should return an error message if one of the teams does not exist', async () => {
      const response = await chaiHttpResponse(matchWithInvalidTeams);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.TeamsMustBeRegistered);
    });

    it('should return an error if any of the fields is not passed', async () => {
      const response = await chaiHttpResponse({ homeTeam: 1, awayTeam: 2 });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('is required');
    });

    it('should return an error if any of the fields is not a number', async () => {
      const response = await chaiHttpResponse({ ...matchesDTOMock[0], homeTeam: 'not_a_number' });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('must be a number');
    });
  });
});
