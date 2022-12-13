import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class Week extends Model<InferAttributes<Week>, InferCreationAttributes<Week>> {
  declare id: number;
  declare weekNum: number;
  declare endDate: Date;
  declare deadlineDate: Date;
  declare isCurrent: CreationOptional<boolean>;
  declare isNext: CreationOptional<boolean>;
  declare isPrevious: CreationOptional<boolean>;
}

export const initWeekDB = (sequelize: Sequelize) => {
  Week.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      weekNum: { type: DataTypes.INTEGER, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      deadlineDate: { type: DataTypes.DATE, allowNull: false },
      isCurrent: { type: DataTypes.BOOLEAN, defaultValue: false },
      isNext: { type: DataTypes.BOOLEAN, defaultValue: false },
      isPrevious: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: "week" }
  );

  return Week;
};

export default Week;
