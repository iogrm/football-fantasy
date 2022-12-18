import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Player from './player.model';
import Team from './team.model';
import Week from './week.model';

class Replacement extends Model<
  InferAttributes<Replacement>,
  InferCreationAttributes<Replacement>
> {
  declare id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare weekId: ForeignKey<Week['id']>;
  declare teamId: ForeignKey<Team['id']>;
  declare oldPlayerId: ForeignKey<Player['id']>;
  declare newPlayerId: ForeignKey<Player['id']>;
  declare position: number;
}

export const initReplacementDB = (sequelize: Sequelize) => {
  Replacement.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      createdAt: DataTypes.DATE,
      position: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'replacementLog' }
  );

  return Replacement;
};

export default Replacement;
