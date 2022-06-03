import { Op } from 'sequelize';
import { IMatchRepository, PlaceType } from './IMatchRepository';
import { IMatchDTO, IMatchUpdatableDTO, IMatchWithTeams } from '../../interfaces/match';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';

class SequelizeMatchRepository implements IMatchRepository {
  private client: typeof Match;

  constructor() {
    this.client = Match;
  }

  findAll = async () => {
    const matches = await this.client.findAll({
      include: [
        { model: Team, foreignKey: 'teamHome', as: 'teamHome', attributes: ['teamName'] },
        { model: Team, foreignKey: 'teamAway', as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as unknown as IMatchWithTeams[];
  };

  findAllByProgressCondition = async (inProgress: boolean, includeAllTeamAttributes?: boolean) => {
    const attributes = includeAllTeamAttributes ? ['teamName', 'id'] : ['teamName'];
    const matches = await this.client.findAll({
      include: [
        { model: Team, foreignKey: 'teamHome', as: 'teamHome', attributes },
        { model: Team, foreignKey: 'teamAway', as: 'teamAway', attributes },
      ],
      where: { inProgress },
    });

    return matches as unknown as IMatchWithTeams[];
  };

  findById = async (id: number) => {
    const match = await this.client.findByPk(id);
    return match;
  };

  create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IMatchDTO) => {
    const match = await this.client.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    return match;
  };

  finish = async (match: Match) => {
    // I'm creating this helper because otherwise,
    // i'll have to set this finish method as static =)
    const helper = () => typeof this.client;
    helper();

    const endedMatch = await match.update({ inProgress: false });
    return endedMatch;
  };

  updateGoals = async (match: Match, { homeTeamGoals, awayTeamGoals }: IMatchUpdatableDTO) => {
    // I'm creating this helper because otherwise,
    // i'll have to set this finish method as static =)
    const helper = () => typeof this.client;
    helper();

    const updatedMatch = await match.update({ homeTeamGoals, awayTeamGoals });
    return updatedMatch;
  };

  findEndedMatchesByTeam = async (teamId: number, place: PlaceType) => {
    const baseWhere = { inProgress: false };
    let where;

    if (place === 'Home') {
      where = { ...baseWhere, homeTeam: teamId };
    } else if (place === 'Away') {
      where = { ...baseWhere, awayTeam: teamId };
    } else {
      where = { ...baseWhere, [Op.or]: [{ homeTeam: teamId }, { awayTeam: teamId }] };
    }

    const matches = await this.client.findAll({ where });

    return matches;
  };
}

export default SequelizeMatchRepository;
