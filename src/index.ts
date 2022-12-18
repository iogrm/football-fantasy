import dotenv from 'dotenv';
import express from 'express';
import ConfiguredExpress from './config/express.config';
import { initRepo } from './init/repo.init';
import { initDomain } from './init/domain.init';

const run = async (envirenment: environment) => {
  dotenv.config();

  const router = express.Router();
  const repos = await initRepo(envirenment);
  const services = initDomain(repos, router);
  const app = new ConfiguredExpress(router);
  app.listen();
  services.batchService.schedule();
};

run('production').catch((err) =>
  console.log('Something bad has happend in the index.ts ', err)
);
