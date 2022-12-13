import dotenv from "dotenv";
import { Sequelize } from "sequelize/types";
import sequelizeConfig from "../../src/config/sequelize-config";
import Follow, { initFollowDB } from "../../src/models/follow";

let server: Sequelize | undefined;

let models: AllModels;
let configTestServer;
let closeTestServer: Function;

let followModel: FollowModelType;

describe("Follow Model Test", () => {
  beforeAll(async () => {
    dotenv.config();

    const sequelize = await sequelizeConfig("test");
    server = sequelize.server;
    models = sequelize.models;
    configTestServer = async () => server;
    closeTestServer = async () => await server?.close();
    (followModel = initFollowDB(server)),
      await expect(configTestServer()).resolves.not.toThrowError();
  });

  afterEach(async () => {
    await Follow?.destroy({ where: {} });
  });

  test("follow a user for first time", async () => {
    const rec = {
      followerId: 1,
      followingId: 2,
    };

    const follow = await followModel.create(rec);
  });

  afterAll(async () => {
    await closeTestServer();
  });
});
