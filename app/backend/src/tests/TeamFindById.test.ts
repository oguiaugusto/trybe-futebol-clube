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

describe('Endpoint GET /teams/:id', () => {
  const chaiHttpResponse = async (id: number) => chai.request(app).get(`/teams/${id}`);

  describe('On success', () => {
    beforeEach(async () => {
      sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);
    });
    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('should return a team object', async () => {
      const response = await chaiHttpResponse(teamsMock[0].id);

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(teamsMock[0]);
    });
  });

  describe('On fail', () => {
    beforeEach(async () => {
      sinon.stub(Team, 'findByPk').resolves(null);
    });

    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('should return an error message if no team is found', async () => {
      const response = await chaiHttpResponse(123456789);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(Messages.TeamNotFound);
    });
  });
});
