import { StatusCodes } from 'http-status-codes';
import { IMatchUpdatableDTO, IMatch } from '../../../interfaces/match';
import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import RequestError from '../../../utils/RequestError';
import Messages from '../../../schemas/Messages';

export interface IMatchUpdateService {
  handle: (id: number, matchGoals: IMatchUpdatableDTO) => Promise<IMatch>;
}

class MatchUpdateService implements IMatchUpdateService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  public handle = async (id: number, matchGoals: IMatchUpdatableDTO) => {
    const existingMatch = await this.repository.findById(id);
    if (!existingMatch) throw new RequestError(StatusCodes.NOT_FOUND, Messages.MatchNotFound);

    const match = await this.repository.updateGoals(existingMatch, matchGoals);
    return match;
  };
}

export default MatchUpdateService;
