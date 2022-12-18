import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import Player from './player.model';
import Week from './week.model';

class PlayerStatus extends Model<
  InferAttributes<PlayerStatus, { omit: 'player' | 'week' }>,
  InferCreationAttributes<PlayerStatus, { omit: 'player' | 'week' }>
> {
  declare id: CreationOptional<number>;
  declare score: number;
  declare price: number;
  declare weekId: ForeignKey<Week['id']>;
  declare playerId: ForeignKey<Player['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare player?: NonAttribute<Player>;
  declare week?: NonAttribute<Week>;

  declare static associations: {
    player: Association<PlayerStatus, Player>;
    week: Association<PlayerStatus, Week>;
  };
}

export const initPlayerStatusDB = (sequelize: Sequelize) => {
  PlayerStatus.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      score: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: 'playerStats' }
  );

  return PlayerStatus;
};

export default PlayerStatus;
