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
import Team from "./team";

class Recrutment extends Model<
  InferAttributes<Recrutment, { omit: "player" | "team" }>,
  InferCreationAttributes<Recrutment, { omit: "player" | "team" }>
> {
  declare id: CreationOptional<number>;
  declare positionNum: number;
  declare expiredAt: CreationOptional<Date>;
  declare isPlaying: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare playerId: ForeignKey<Player["id"]>;
  declare teamId: ForeignKey<Team["id"]>;

  declare player?: NonAttribute<Player>;
  declare team?: NonAttribute<Team>;

  declare static associations: {
    player: Association<Recrutment, Player>;
    team: Association<Recrutment, Team>;
  };
}

export const initRecrutmentDB = (sequelize: Sequelize) => {
  Recrutment.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      positionNum: { type: DataTypes.INTEGER, allowNull: false },
      expiredAt: { type: DataTypes.DATE, allowNull: true },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      isPlaying: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { sequelize, modelName: "recrutment" }
  );

  return Recrutment;
};

export default Recrutment;
