import sequelizeConfig from "./sequelize-config";
import { redisConfig } from "./redis-config";
export const deployInfrastructure = async (envirenment: environment) => {
  const sequelize = await sequelizeConfig(envirenment);
  const redis = await redisConfig();
  return { sequelize, redis };
};
