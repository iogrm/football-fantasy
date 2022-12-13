import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare firstname: string;
  declare lastname: string;
  declare profileImage: CreationOptional<string>;
  declare country: string;
  declare email: string;
  declare birthday: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserDB = (sequelize: Sequelize) => {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      firstname: { type: DataTypes.STRING },
      lastname: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      profileImage: { type: DataTypes.STRING },
      birthday: { type: DataTypes.DATE },
      email: { type: DataTypes.STRING },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "user" }
  );

  return User;
};

export default User;
