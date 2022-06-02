import { IMatchWithTeams } from '../../../interfaces/match';
import { IMatchRepository } from '../../../repositories/Match/IMatchRepository';

export interface IMatchFindAllService {
  handle: (inProgress: string | undefined) => Promise<IMatchWithTeams[]>;
}

class MatchFindAllService implements IMatchFindAllService {
  constructor(private repository: IMatchRepository) {
    this.repository = repository;
  }

  public handle = async (inProgress: string | undefined) => {
    let matches: IMatchWithTeams[];

    if (inProgress === 'true' || inProgress === 'false') {
      const showInProgressMatches = inProgress === 'true';
      matches = await this.repository.findAllByProgressCondition(showInProgressMatches);
    } else {
      matches = await this.repository.findAll();
    }

    return matches;
  };
}

export default MatchFindAllService;
