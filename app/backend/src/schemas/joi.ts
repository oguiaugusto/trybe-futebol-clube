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
}

export default Schemas;
