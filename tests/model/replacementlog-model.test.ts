import dotenv from 'dotenv';
import { Sequelize } from 'sequelize/types';
import sequelizeConfig from '../../src/config/sequelize.config';
import Replacement, {
  initReplacementDB,
} from '../../src/sequelize/model/replacement.model';

let server: Sequelize | undefined;

let models: AllModels;
let configTestServer;
let closeTestServer: Function;

let replacementLogModel: ReplacementModelType;

describe('Replacement Log Model Test', () => {
  beforeAll(async () => {
    dotenv.config();

    const sequelize = await sequelizeConfig('test');
    server = sequelize.server;
    models = sequelize.models;
    configTestServer = async () => server;
    closeTestServer = async () => await server?.close();
    (replacementLogModel = initReplacementDB(server)),
      await expect(configTestServer()).resolves.not.toThrowError();
  });

  afterEach(async () => {
    await Replacement?.destroy({ where: {} });
  });

  test('create in replacement Log Model', async () => {
    const rec = {
      weekId: 1,
      teamId: 2,
      oldPlayerId: 3,
      newPlayerId: 4,
      position: 5,
    };

    const log = await replacementLogModel.create(rec);
  });

  afterAll(async () => {
    await closeTestServer();
  });
});
