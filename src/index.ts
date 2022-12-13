import dotenv from "dotenv";
import CustomExpress from "./config/custom-express";
import { deployInfrastructure } from "./config/infrastructure-config";
import { initDomain } from "./init/domain-init";

const run = async (envirenment: environment) => {
  dotenv.config();

  const { sequelize, redis } = await deployInfrastructure(envirenment);
  const { routers, components } = initDomain(sequelize, redis);
  const app = new CustomExpress(routers);

  app.listen();
  components.batchComponent.schedule();
};

run("production").catch((err) =>
  console.log("Something bad has happend in the index.ts ", err)
);
