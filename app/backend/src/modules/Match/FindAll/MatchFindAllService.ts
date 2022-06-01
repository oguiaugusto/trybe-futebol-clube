import { IMatchWithTeams } from '../../../interfaces/match';
import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';

export interface IMatchFindAllService {
  handle: () => Promise<IMatchWithTeams[]>;
}

class MatchFindAllService implements IMatchFindAllService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  public handle = async () => {
    const matches = await this.repository.findAll();

    return matches;
  };
}

export default MatchFindAllService;
