import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesDTOMock, matchesMock, matchWithInvalidTeams, matchWithSameTeam } from './mocks/match';
import { teamsMock } from './mocks/team';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';
import { Identifier } from 'sequelize/types';
import { FindOptions } from 'sequelize/types';
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint POST /matches', () => {
  const chaiHttpResponse = async (body?: string | object) => (
    chai.request(app).post('/matches').send(body)
  );
  let mockedTeam: sinon.SinonStub<[identifier?: Identifier, options?: Omit<FindOptions<any>, "where">], Promise<Model<any, any> | null>>;

  describe('On success', () => {
    beforeEach(async () => {
      mockedTeam = sinon.stub(Team, 'findByPk');
      sinon.stub(Match, 'create').resolves(matchesMock[2] as Match);

      mockedTeam.onCall(0).resolves(teamsMock[0] as Team);
      mockedTeam.onCall(1).resolves(teamsMock[1] as Team);
    });

    afterEach(() => {
      mockedTeam.restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('should return the match object', async () => {
      const response = await chaiHttpResponse(matchesDTOMock[2]);
  
      expect(response.status).to.be.equal(StatusCodes.CREATED);
      expect(response.body).to.be.eql(matchesMock[2]);
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      mockedTeam = sinon.stub(Team, 'findByPk');
      sinon.stub(Match, 'create').resolves(undefined);
    });

    afterEach(() => {
      mockedTeam.restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('should return an error message if one of the teams does not exist', async () => {
      mockedTeam.onCall(0).resolves(teamsMock[0] as Team);
      mockedTeam.onCall(1).resolves(null);
      const response = await chaiHttpResponse(matchWithInvalidTeams);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.TeamNotFound);
    });

    it('should return an error message if both teams are the same', async () => {
      mockedTeam.onCall(0).resolves(teamsMock[0] as Team);
      mockedTeam.onCall(1).resolves(teamsMock[0] as Team);
      const response = await chaiHttpResponse(matchWithSameTeam);

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.NoEqualTeams);
    });

    it('should return an error if any of the fields is not passed', async () => {
      const response = await chaiHttpResponse({ homeTeam: 1, awayTeam: 2 });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('is required');
    });

    it('should return an error if number fields are not number', async () => {
      const response = await chaiHttpResponse({ ...matchesDTOMock[2], homeTeam: 'not_a_number' });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('must be a number');
    });

    it('should return an error message if inProgress field is passed as false', async () => {
      const response = await chaiHttpResponse({ ...matchesDTOMock[0], inProgress: false });

      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('inProgress');
      expect(response.body.message).to.include('invalid value');
    });
  });
});

