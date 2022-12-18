import { Sequelize } from 'sequelize';
import Follow, { initFollowDB } from '../sequelize/model/follow.model';
import Like, { initLikeDB } from '../sequelize/model/like.model';
import Player, { initPlayerDB } from '../sequelize/model/player.model';
import PlayerStatus, {
  initPlayerStatusDB,
} from '../sequelize/model/player-stats.model';
import Recrutment, {
  initRecrutmentDB,
} from '../sequelize/model/recrutment.model';
import Replacement, {
  initReplacementDB,
} from '../sequelize/model/replacement.model';
import Team, { initTeamDB } from '../sequelize/model/team.model';
import User, { initUserDB } from '../sequelize/model/user.model';
import Week, { initWeekDB } from '../sequelize/model/week.model';

const sequelizeConfig = async (type: environment) => {
  try {
    if (
      !process.env.POSGRESS_URL ||
      !process.env?.POSGERES_USERNAME ||
      !process.env?.POSGERES_PASSWORD ||
      !process.env?.DATABASE_NAME ||
      !process.env?.TEST_DATABASE_NAME
    ) {
      throw new Error('Invalid .env config for database');
    }

    const sequelize = new Sequelize(
      type === 'test'
        ? process.env.TEST_DATABASE_NAME
        : process.env?.DATABASE_NAME,
      process.env?.POSGERES_USERNAME,
      process.env?.POSGERES_PASSWORD,
      {
        host: process.env.PSQL_HOST ?? process.env.POSGRESS_URL,
        dialect: 'postgres',
        logging: false,
        port: process.env?.POSTGRES_PORT as unknown as number,
      }
    );

    const models: AllModels = {
      playerStatsModel: initPlayerStatusDB(sequelize),
      playerModel: initPlayerDB(sequelize),
      userModel: initUserDB(sequelize),
      teamModel: initTeamDB(sequelize),
      weekModel: initWeekDB(sequelize),
      followModel: initFollowDB(sequelize),
      recrutmentModel: initRecrutmentDB(sequelize),
      replacementModel: initReplacementDB(sequelize),
      likeModel: initLikeDB(sequelize),
    };
    Team.belongsTo(User, { targetKey: 'id' });
    User.hasOne(Team, { foreignKey: 'userId', sourceKey: 'id' });

    PlayerStatus.belongsTo(Player, { targetKey: 'id' });
    Player.hasMany(PlayerStatus, { foreignKey: 'playerId', sourceKey: 'id' });

    PlayerStatus.belongsTo(Week, { targetKey: 'id' });
    Week.hasMany(PlayerStatus, { foreignKey: 'weekId', sourceKey: 'id' });

    Recrutment.belongsTo(Player, { targetKey: 'id' });
    Player.hasMany(Recrutment, { foreignKey: 'playerId', sourceKey: 'id' });

    Recrutment.belongsTo(Team, { targetKey: 'id' });
    Team.hasMany(Recrutment, { foreignKey: 'teamId', sourceKey: 'id' });

    Follow.belongsTo(User, { targetKey: 'id' });
    User.hasMany(Follow, { foreignKey: 'followerId', sourceKey: 'id' });

    Follow.belongsTo(User, { targetKey: 'id' });
    User.hasMany(Follow, { foreignKey: 'followingId', sourceKey: 'id' });

    Like.belongsTo(User, { targetKey: 'id' });
    User.hasMany(Like, { foreignKey: 'likerId', sourceKey: 'id' });

    Like.belongsTo(User, { targetKey: 'id' });
    User.hasMany(Like, { foreignKey: 'likeeId', sourceKey: 'id' });

    Like.belongsTo(Week, { targetKey: 'id' });
    Week.hasMany(Like, { foreignKey: 'weekId', sourceKey: 'id' });

    Replacement.belongsTo(Week, { targetKey: 'id' });
    Week.hasMany(Replacement, { foreignKey: 'weekId', sourceKey: 'id' });

    Replacement.belongsTo(Team, { targetKey: 'id' });
    Team.hasMany(Replacement, { foreignKey: 'teamId', sourceKey: 'id' });

    Replacement.belongsTo(Player, { targetKey: 'id' });
    Player.hasMany(Replacement, {
      foreignKey: 'oldPlayerId',
      sourceKey: 'id',
    });

    Replacement.belongsTo(Player, { targetKey: 'id' });
    Player.hasMany(Replacement, {
      foreignKey: 'newPlayerId',
      sourceKey: 'id',
    });

    await sequelize.sync({ force: type === 'test' ? true : false });

    if (type !== 'test')
      console.log('Connection has been established successfully.');

    return { models, server: sequelize };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelizeConfig;
