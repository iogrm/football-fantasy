import * as redis from "redis";
import { initControllers } from "./controller-init";
import { initServices } from "./service-init";
import { initRouters } from "./route-init";
import { initRepositories } from "./repo-init";
import { Sequelize } from "sequelize/types";
import { initComponents } from "./component-init";

export const initDomain = (
  sequelize: {
    models: AllModels;
    server: Sequelize;
  },
  redis: redis.RedisClientType
) => {
  const { models } = sequelize;
  const repos = initRepositories({ redis, models });
  const services = initServices(repos);
  const components = initComponents(services);
  const controllers = initControllers(services);
  const routers = initRouters(controllers);

  return { models, repos, services, components, controllers, routers };
};
