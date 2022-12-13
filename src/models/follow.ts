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
import User from "./user";

class Follow extends Model<
  InferAttributes<Follow, { omit: "follower" | "following" }>,
  InferCreationAttributes<Follow, { omit: "follower" | "following" }>
> {
  declare id: CreationOptional<number>;
  // declare createdAt: CreationOptional<Date>;

  declare followerId: ForeignKey<User["id"]>;
  declare followingId: ForeignKey<User["id"]>;

  declare follower?: NonAttribute<User>;
  declare following?: NonAttribute<User>;

  declare static associations: {
    follower: Association<Follow, User>;
    following: Association<Follow, User>;
  };
}

export const initFollowDB = (sequelize: Sequelize) => {
  Follow.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      // create dAt: DataTypes.DATE,
    },
    { sequelize, modelName: "follow" }
  );

  return Follow;
};

export default Follow;
