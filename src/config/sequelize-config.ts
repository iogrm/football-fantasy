import { Sequelize } from "sequelize";
import Follow, { initFollowDB } from "../models/follow";
import Like, { initLikeDB } from "../models/like";
import Player, { initPlayerDB } from "../models/player";
import PlayerStats, { initPlayerStatsDB } from "../models/player-stats";
import Recrutment, { initRecrutmentDB } from "../models/recrutment";
import ReplacementLog, {
  initReplacementLogDB,
} from "../models/replacement-log";
import Team, { initTeamDB } from "../models/team";
import User, { initUserDB } from "../models/user";
import Week, { initWeekDB } from "../models/week";

const sequelizeConfig = async (type: environment) => {
  try {
    if (
      !process.env.POSGRESS_URL ||
      !process.env?.POSGERES_USERNAME ||
      !process.env?.POSGERES_PASSWORD ||
      !process.env?.DATABASE_NAME ||
      !process.env?.TEST_DATABASE_NAME
    ) {
      throw new Error("Invalid .env config for database");
    }

    const sequelize = new Sequelize(
      type === "test"
        ? process.env.TEST_DATABASE_NAME
        : process.env?.DATABASE_NAME,
      process.env?.POSGERES_USERNAME,
      process.env?.POSGERES_PASSWORD,
      {
        host: process.env.PSQL_HOST ?? process.env.POSGRESS_URL,
        dialect: "postgres",
        logging: false,
        port: process.env?.POSTGRES_PORT as unknown as number,
      }
    );

    const models: AllModels = {
      playerStatsModel: initPlayerStatsDB(sequelize),
      playerModel: initPlayerDB(sequelize),
      userModel: initUserDB(sequelize),
      teamModel: initTeamDB(sequelize),
      weekModel: initWeekDB(sequelize),
      followModel: initFollowDB(sequelize),
      recrutmentModel: initRecrutmentDB(sequelize),
      replacementLogModel: initReplacementLogDB(sequelize),
      likeModel: initLikeDB(sequelize),
    };
    Team.belongsTo(User, { targetKey: "id" });
    User.hasOne(Team, { foreignKey: "userId", sourceKey: "id" });

    PlayerStats.belongsTo(Player, { targetKey: "id" });
    Player.hasMany(PlayerStats, { foreignKey: "playerId", sourceKey: "id" });

    PlayerStats.belongsTo(Week, { targetKey: "id" });
    Week.hasMany(PlayerStats, { foreignKey: "weekId", sourceKey: "id" });

    Recrutment.belongsTo(Player, { targetKey: "id" });
    Player.hasMany(Recrutment, { foreignKey: "playerId", sourceKey: "id" });

    Recrutment.belongsTo(Team, { targetKey: "id" });
    Team.hasMany(Recrutment, { foreignKey: "teamId", sourceKey: "id" });

    Follow.belongsTo(User, { targetKey: "id" });
    User.hasMany(Follow, { foreignKey: "followerId", sourceKey: "id" });

    Follow.belongsTo(User, { targetKey: "id" });
    User.hasMany(Follow, { foreignKey: "followingId", sourceKey: "id" });

    Like.belongsTo(User, { targetKey: "id" });
    User.hasMany(Like, { foreignKey: "likerId", sourceKey: "id" });

    Like.belongsTo(User, { targetKey: "id" });
    User.hasMany(Like, { foreignKey: "likeeId", sourceKey: "id" });

    Like.belongsTo(Week, { targetKey: "id" });
    Week.hasMany(Like, { foreignKey: "weekId", sourceKey: "id" });

    ReplacementLog.belongsTo(Week, { targetKey: "id" });
    Week.hasMany(ReplacementLog, { foreignKey: "weekId", sourceKey: "id" });

    ReplacementLog.belongsTo(Team, { targetKey: "id" });
    Team.hasMany(ReplacementLog, { foreignKey: "teamId", sourceKey: "id" });

    ReplacementLog.belongsTo(Player, { targetKey: "id" });
    Player.hasMany(ReplacementLog, {
      foreignKey: "oldPlayerId",
      sourceKey: "id",
    });

    ReplacementLog.belongsTo(Player, { targetKey: "id" });
    Player.hasMany(ReplacementLog, {
      foreignKey: "newPlayerId",
      sourceKey: "id",
    });

    await sequelize.sync({ force: type === "test" ? true : false });

    if (type !== "test")
      console.log("Connection has been established successfully.");

    return { models, server: sequelize };
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelizeConfig;
