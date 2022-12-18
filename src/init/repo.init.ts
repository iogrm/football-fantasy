import { initRepositories as initSezuelizeRepos } from './sequelize-repo.init';
import { initRepositories as initTypeormRepos } from './typeorm-repo.init';
import sequelizeConfig from '../config/sequelize.config';
import { redisConfig } from '../config/redis.config';
import { AppDataSource } from '../data-source';
export const initRepo = async (envirenment: environment) => {
  const sequelize = await sequelizeConfig(envirenment);
  const typeorm = await AppDataSource.initialize();
  const redis = await redisConfig();
  const models = sequelize.models;
  const sequelizeRepos = initSezuelizeRepos({
    models,
    redis,
  });
  const typeormRepos = initTypeormRepos({ dataSource: typeorm, redis });
  return typeormRepos;
};
