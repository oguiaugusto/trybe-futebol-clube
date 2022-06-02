import { StatusCodes } from 'http-status-codes';
import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import { ITeamRepository } from '../../../repositories/Team/ITeamRepository';
import { IMatchDTO, IMatch } from '../../../interfaces/match';
import RequestError from '../../../utils/RequestError';
import Messages from '../../../schemas/Messages';

export interface IMatchCreateService {
  handle: (match: IMatchDTO) => Promise<IMatch>;
}

class MatchCreateService {
  constructor(
    private repository: IMatchRepository,
    private teamsRepository: ITeamRepository,
  ) {
    this.repository = repository;
  }

  public handle = async ({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  }: IMatchDTO) => {
    const existingHomeTeam = await this.teamsRepository.findById(homeTeam);
    const existingAwayTeam = await this.teamsRepository.findById(awayTeam);

    if (!existingHomeTeam || !existingAwayTeam) {
      throw new RequestError(StatusCodes.NOT_FOUND, Messages.TeamsMustBeRegistered);
    }

    const match = await this.repository.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    return match;
  };
}

export default MatchCreateService;
