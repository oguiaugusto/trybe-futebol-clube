import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesMock, updatableMatchMock } from './mocks/match';
import { teamsMock } from './mocks/team';
import Messages from '../schemas/Messages';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint POST /matches', () => {
  const chaiHttpResponse = async (id: number) => (
    chai.request(app).patch(`/matches/${id}/finish`)
  );

  describe('On success', async () => {
    beforeEach(async () => {
      sinon.stub(Match, 'findByPk').resolves(updatableMatchMock);
      sinon.stub(Match.prototype, 'update').resolves({ ...matchesMock[2], inProgress: false } as Match);
    });

    afterEach(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.prototype.update as sinon.SinonStub).restore();
    });

    it('should return a message with "Finished"', async () => {
      const response = await chaiHttpResponse(matchesMock[2].id);
  
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.Finished);
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      sinon.stub(Match.prototype, 'update').resolves(updatableMatchMock);
    });

    afterEach(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.prototype.update as sinon.SinonStub).restore();
    });

    it('should return an error message if provided id does not exist', async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      const response = await chaiHttpResponse(123123);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.MatchNotFound);
    });

    it('should return an error message if match is already ended', async () => {
      sinon.stub(Match, 'findByPk').resolves(matchesMock[0] as Match);
      const response = await chaiHttpResponse(123123);

      expect(response.status).to.be.equal(StatusCodes.CONFLICT);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.MatchAlreadyEnded);
    });
  });
});
