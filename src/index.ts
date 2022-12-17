import dotenv from "dotenv";
import express from "express";
import CustomExpress from "./config/express.config";
import { deployInfrastructure } from "./config/infrastructure.config";
import { initDomain } from "./init/domain-init";

const run = async (envirenment: environment) => {
  dotenv.config();

  const router = express.Router();
  const { sequelize, redis } = await deployInfrastructure(envirenment);
  const services = initDomain(sequelize.models, redis, router);
  const app = new CustomExpress(router);
  app.listen();
  services.batchService.schedule();
};

run("production").catch((err) =>
  console.log("Something bad has happend in the index.ts ", err)
);
