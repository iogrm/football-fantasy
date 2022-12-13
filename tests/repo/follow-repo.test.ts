import dotenv from "dotenv";
import { Sequelize } from "sequelize/types";
import sequelizeConfig from "../../src/config/sequelize-config";
import Follow from "../../src/models/follow";
import FollowRepository from "../../src/repos/follow-repo";
import UserRepository from "../../src/repos/user-repo";

let server: Sequelize | undefined;

let models: AllModels;
let configTestServer;
let closeTestServer: Function;

let userRepo: UserRepositoryInterface;
let followRepo: FollowRepositoryInterface;

const atime = new Date();
const userDefault = {
  username: "user1",
  password: "pass1",
  firstname: "amir",
  lastname: "abdol",
  email: "amir@abdol.com",
  country: "iran",
  birthday: atime,
};
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

describe("Follow Repo Test", () => {
  beforeAll(async () => {
    dotenv.config();

    const sequelize = await sequelizeConfig("test");
    server = sequelize.server;
    models = sequelize.models;
    configTestServer = async () => server;
    closeTestServer = async () => await server?.close();
    userRepo = new UserRepository(models.userModel);
    followRepo = new FollowRepository(models.followModel);

    await expect(configTestServer()).resolves.not.toThrowError();
    await userRepo.create(usersInfo[0]);
    await userRepo.create(usersInfo[1]);
    await userRepo.create(usersInfo[2]);
  });

  afterEach(async () => {
    await Follow?.destroy({ where: {} });
  });

  test("follow a user for first time", async () => {
    const follower = await userRepo.getUserByEmail(usersInfo[0].email);
    const following = await userRepo.getUserByEmail(usersInfo[1].email);

    const follow = await followRepo.createFollow(follower?.id!, following?.id!);
    expect(follow).toStrictEqual({
      followerId: follower?.id!,
      followingId: following?.id!,
    });
  });

  test("get followers", async () => {
    const user1 = await userRepo.getUserByEmail(usersInfo[0].email);
    const user2 = await userRepo.getUserByEmail(usersInfo[1].email);
    const user3 = await userRepo.getUserByEmail(usersInfo[2].email);

    await followRepo.createFollow(user1?.id!, user3?.id!);
    await followRepo.createFollow(user2?.id!, user3?.id!);
    let followers3 = await followRepo.getFollowers(user3?.id!);
    expect(followers3).toStrictEqual([1, 2]);

    await followRepo.createFollow(user3?.id!, user2?.id!);
    let followers2 = await followRepo.getFollowers(user2?.id!);
    expect(followers2).toStrictEqual([3]);

    let followers1 = await followRepo.getFollowers(user1?.id!);
    expect(followers1).toStrictEqual([]);
  });

  test("get followings", async () => {
    const user1 = await userRepo.getUserByEmail(usersInfo[0].email);
    const user2 = await userRepo.getUserByEmail(usersInfo[1].email);
    const user3 = await userRepo.getUserByEmail(usersInfo[2].email);

    await followRepo.createFollow(user2?.id!, user1?.id!);
    await followRepo.createFollow(user2?.id!, user3?.id!);
    await followRepo.createFollow(user3?.id!, user1?.id!);

    let followings3 = await followRepo.getFollowings(user3?.id!);
    expect(followings3).toStrictEqual([1]);

    let followings2 = await followRepo.getFollowings(user2?.id!);
    expect(followings2).toStrictEqual([1, 3]);

    let followings1 = await followRepo.getFollowings(user1?.id!);
    expect(followings1).toStrictEqual([]);
  });

  test("unfollow a user", async () => {
    const user1 = await userRepo.getUserByEmail(usersInfo[0].email);
    const user2 = await userRepo.getUserByEmail(usersInfo[1].email);
    const user3 = await userRepo.getUserByEmail(usersInfo[2].email);

    await followRepo.createFollow(user1?.id!, user2?.id!);
    await followRepo.createFollow(user1?.id!, user3?.id!);
    await followRepo.createFollow(user2?.id!, user3?.id!);

    let followers1 = await followRepo.getFollowers(user1?.id!);
    let followers2 = await followRepo.getFollowers(user2?.id!);
    let followers3 = await followRepo.getFollowers(user3?.id!);

    let followings1 = await followRepo.getFollowings(user1?.id!);
    let followings2 = await followRepo.getFollowings(user2?.id!);
    let followings3 = await followRepo.getFollowings(user3?.id!);

    expect(followers1).toStrictEqual([]);
    expect(followers2).toStrictEqual([1]);
    expect(followers3).toStrictEqual([1, 2]);

    expect(followings1).toStrictEqual([2, 3]);
    expect(followings2).toStrictEqual([3]);
    expect(followings3).toStrictEqual([]);

    await followRepo.removeFollow(user1?.id!, user2?.id!);
    await followRepo.removeFollow(user2?.id!, user3?.id!);

    followers1 = await followRepo.getFollowers(user1?.id!);
    followers2 = await followRepo.getFollowers(user2?.id!);
    followers3 = await followRepo.getFollowers(user3?.id!);

    followings1 = await followRepo.getFollowings(user1?.id!);
    followings2 = await followRepo.getFollowings(user2?.id!);
    followings3 = await followRepo.getFollowings(user3?.id!);

    expect(followers1).toStrictEqual([]);
    expect(followers2).toStrictEqual([]);
    expect(followers3).toStrictEqual([1]);

    expect(followings1).toStrictEqual([3]);
    expect(followings2).toStrictEqual([]);
    expect(followings3).toStrictEqual([]);
  });

  afterAll(async () => {
    await closeTestServer();
  });
});
