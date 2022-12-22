import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class Player extends Model<
  InferAttributes<Player>,
  InferCreationAttributes<Player>
> {
  declare id: number;
  declare firstName: string;
  declare secondName: string;
  declare club: string;
  declare role: string;
  declare webname: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initPlayerDB = (sequelize: Sequelize) => {
  Player.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      secondName: { type: DataTypes.STRING, allowNull: false },
      webname: { type: DataTypes.STRING, allowNull: true },
      club: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "player" }
  );

  return Player;
};

export default Player;
