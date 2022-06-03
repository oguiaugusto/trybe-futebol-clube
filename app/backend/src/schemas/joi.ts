import { Joi } from 'celebrate';

class Schemas {
  static get matchPost() {
    return Joi.object().keys({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean().invalid(false).optional(),
    });
  }

  static get matchGoalsPatch() {
    return Joi.object().keys({
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });
  }
}

export default Schemas;
