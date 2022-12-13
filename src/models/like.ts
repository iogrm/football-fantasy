import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import User from "./user";
import Week from "./week";

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare likerId: ForeignKey<User["id"]>;
  declare likeeId: ForeignKey<User["id"]>;
  declare weekId: ForeignKey<Week["id"]>;
}

export const initLikeDB = (sequelize: Sequelize) => {
  Like.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "like" }
  );

  return Like;
};

export default Like;
