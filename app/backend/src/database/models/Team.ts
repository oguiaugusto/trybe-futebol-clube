import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: number;
}

Team.init({
  id: { primaryKey: true, type: DataTypes.INTEGER },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
