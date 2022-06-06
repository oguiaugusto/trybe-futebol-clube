import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';
import allByProgressCondition from './mocks/leaderboard/awayAllByProgressCondition';
import endedMatchesByTeam from './mocks/leaderboard/awayEndedMatchesByTeam';
import expectedLeaderBoard from './mocks/leaderboard/awayLeaderboard';
import { FindOptions } from 'sequelize/types';
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /leaderboard/away', () => {
  const chaiHttpResponse = async () => chai.request(app).get('/leaderboard/away');
  let mockedMatch: sinon.SinonStub<[options?: FindOptions<any>], Promise<Model<any, any>[]>>;
  
  describe('On success', () => {
    beforeEach(async () => {
      mockedMatch = sinon.stub(Match, 'findAll');
      mockedMatch.onCall(0).resolves(allByProgressCondition as unknown as Match[]);
      mockedMatch.onCall(1).resolves(endedMatchesByTeam[0] as Match[]);
      mockedMatch.onCall(2).resolves(endedMatchesByTeam[1] as Match[]);
      mockedMatch.onCall(3).resolves(endedMatchesByTeam[2] as Match[]);
      mockedMatch.onCall(4).resolves(endedMatchesByTeam[3] as Match[]);
    });

    afterEach(() => {
      mockedMatch.restore();
    });

    it('should return the match object', async () => {
      const response = await chaiHttpResponse();
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(expectedLeaderBoard);
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
