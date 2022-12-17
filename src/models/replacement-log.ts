import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import Player from "../player/player.model";
import Team from "../team/team.model";
import Week from "../week/week.model";

class ReplacementLog extends Model<
  InferAttributes<ReplacementLog>,
  InferCreationAttributes<ReplacementLog>
> {
  declare id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare weekId: ForeignKey<Week["id"]>;
  declare teamId: ForeignKey<Team["id"]>;
  declare oldPlayerId: ForeignKey<Player["id"]>;
  declare newPlayerId: ForeignKey<Player["id"]>;
  declare position: number;
}

export const initReplacementLogDB = (sequelize: Sequelize) => {
  ReplacementLog.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      createdAt: DataTypes.DATE,
      position: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "replacementLog" }
  );

  return ReplacementLog;
};

export default ReplacementLog;
