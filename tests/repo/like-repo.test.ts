import dotenv from "dotenv";
import { Sequelize } from "sequelize/types";
import sequelizeConfig from "../../src/config/sequelize-config";
import Like from "../../src/models/like";
import LikeRepository from "../../src/repos/like-repo";
import UserRepository from "../../src/repos/user-repo";
import WeekRepository from "../../src/repos/week-repo";

let server: Sequelize | undefined;

let models: AllModels;
let configTestServer;
let closeTestServer: Function;

let userRepo: UserRepositoryInterface;
let likeRepo: LikeRepositoryInterface;
let weekRepo: WeekRepositoryInterface;

const atime = new Date();
const usersInfo = [
  {
    username: "user1",
    password: "pass1",
    firstname: "amir",
    lastname: "abdol",
    email: "amir@abdol.com",
    country: "iran",
    birthday: atime,
  },
  {
    username: "user2",
    password: "pass2",
    firstname: "ali",
    lastname: "giti",
    email: "ali@git.god",
    country: "afghanestan",
    birthday: atime,
  },
  {
    username: "user3",
    password: "pass3",
    firstname: "amin",
    lastname: "tspro",
    email: "amin@ts.pro",
    country: "UK",
    birthday: atime,
  },
];

const weeks: WeekOutputType[] = [
  {
    id: 1,
    weekNum: 1,
    endDate: new Date(),
    deadlineDate: new Date(),
    isCurrent: false,
    isNext: false,
    isPrevious: false,
  },
  {
    id: 2,
    weekNum: 2,
    endDate: new Date(),
    deadlineDate: new Date(),
    isCurrent: true,
    isNext: false,
    isPrevious: false,
  },
  {
    id: 3,
    weekNum: 3,
    endDate: new Date(),
    deadlineDate: new Date(),
    isCurrent: false,
    isNext: false,
    isPrevious: false,
  },
];

describe("Like Repo Test", () => {
  beforeAll(async () => {
    dotenv.config();

    const sequelize = await sequelizeConfig("test");
    server = sequelize.server;
    models = sequelize.models;
    configTestServer = async () => server;
    closeTestServer = async () => await server?.close();
    userRepo = new UserRepository(models.userModel);
    likeRepo = new LikeRepository(models.likeModel);
    weekRepo = new WeekRepository(models.weekModel);

    await expect(configTestServer()).resolves.not.toThrowError();
    await userRepo.create(usersInfo[0]);
    await userRepo.create(usersInfo[1]);
    await userRepo.create(usersInfo[2]);
    await weekRepo.refreshWeeks(weeks);
  });

  afterEach(async () => {
    await Like?.destroy({ where: {} });
  });

  test("like a vitrine of a user", async () => {
    const follower = await userRepo.getUserByEmail(usersInfo[0].email);
    const following = await userRepo.getUserByEmail(usersInfo[1].email);
    const week = weeks[1];

    const record = {
      weekId: week.id,
      likerId: follower?.id!,
      likeeId: following?.id!,
    };
    const like = await likeRepo.createLike(record);
    expect(like).toStrictEqual({
      likerId: follower?.id!,
      likeeId: following?.id!,
      weekId: week.id,
    });
  });

  test("islike a vitrine of a user", async () => {
    const follower = await userRepo.getUserByEmail(usersInfo[0].email);
    const following = await userRepo.getUserByEmail(usersInfo[1].email);

    const week = weeks[1];

    const record = {
      weekId: week.id,
      likerId: follower?.id!,
      likeeId: following?.id!,
    };
    const like = await likeRepo.createLike(record);
    const islike = await likeRepo.isLike(record);
    expect(islike).toStrictEqual(true);
  });

  test("unlike a vitrine of a user", async () => {
    const follower = await userRepo.getUserByEmail(usersInfo[0].email);
    const following = await userRepo.getUserByEmail(usersInfo[1].email);

    const week = weeks[1];

    const record = {
      weekId: week.id,
      likerId: follower?.id!,
      likeeId: following?.id!,
    };
    await likeRepo.createLike(record);
    let islike = await likeRepo.isLike(record);
    expect(islike).toStrictEqual(true);
    await likeRepo.removeLike(record);

    islike = await likeRepo.isLike(record);
    expect(islike).toStrictEqual(false);
  });

  afterAll(async () => {
    await closeTestServer();
  });
});
