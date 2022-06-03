import { StatusCodes } from 'http-status-codes';
import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';
import RequestError from '../../../utils/RequestError';
import Messages from '../../../schemas/Messages';

export interface IMatchFinishService {
  handle: (id: number) => Promise<void>;
}

class MatchFinishService implements IMatchFinishService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  public handle = async (id: number) => {
    const existingMatch = await this.repository.findById(id);
    if (!existingMatch) {
      throw new RequestError(StatusCodes.NOT_FOUND, Messages.MatchNotFound);
    }
    if (!existingMatch.inProgress) {
      throw new RequestError(StatusCodes.CONFLICT, Messages.MatchAlreadyEnded);
    }

    await this.repository.finish(existingMatch);
  };
}

export default MatchFinishService;
