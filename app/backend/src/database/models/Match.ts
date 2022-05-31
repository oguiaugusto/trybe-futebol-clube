import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

Match.init({
  id: { primaryKey: true, type: DataTypes.INTEGER },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'foreignMatches' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
