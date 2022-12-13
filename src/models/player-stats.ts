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
} from "sequelize";
import Player from "./player";
import Week from "./week";

class PlayerStats extends Model<
  InferAttributes<PlayerStats, { omit: "player" | "week" }>,
  InferCreationAttributes<PlayerStats, { omit: "player" | "week" }>
> {
  declare id: CreationOptional<number>;
  declare score: number;
  declare price: number;
  declare weekId: ForeignKey<Week["id"]>;
  declare playerId: ForeignKey<Player["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare player?: NonAttribute<Player>;
  declare week?: NonAttribute<Week>;

  declare static associations: {
    player: Association<PlayerStats, Player>;
    week: Association<PlayerStats, Week>;
  };
}

export const initPlayerStatsDB = (sequelize: Sequelize) => {
  PlayerStats.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      score: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "playerStats" }
  );

  return PlayerStats;
};

export default PlayerStats;
