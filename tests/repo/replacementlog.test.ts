import dotenv from "dotenv";
import { Sequelize } from "sequelize/types";
import sequelizeConfig from "../../src/config/sequelize-config";
import ReplacementLog from "../../src/models/replacement-log";
import ReplacementLogRepository from "../../src/repos/replacement-log-repo";
import WeekRepository from "../../src/repos/week-repo";
import UserRepository from "../../src/repos/user-repo";
import PlayerRepository from "../../src/repos/player-repo";
import { initDomain } from "../../src/init/domain-init";
import { deployInfrastructure } from "../../src/config/infrastructure-config";

let server: Sequelize | undefined;

let configTestServer;
let closeTestServer: Function;

let replacementLogRepo: ReplacementLogRepositoryInterface;
let weekRepo: WeekRepositoryInterface;
let userRepo: UserRepositoryInterface;
let refreshService: RefreshServiceInterface;
let teamService: TeamServiceInterface;
let user: UserOutputType;

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

const players: RecrutedPlayerOutputType[] = [
  {
    id: 3,
    firstName: "ali",
    secondName: "mahmoodi",
    webname: "ali",
    club: "uve",
    role: "Defenders",
    positionNum: 4,
    isPlaying: true,
    playerStats: {
      id: 5,
      price: 50,
      score: 52,
      weekId: 2,
    },
  },
  {
    id: 6,
    firstName: "amir",
    secondName: "mehri",
    webname: "amir",
    club: "barsa",
    role: "Midfielders",
    positionNum: 7,
    isPlaying: true,
    playerStats: {
      id: 8,
      price: 200,
      score: 302,
      weekId: 2,
    },
  },
  {
    id: 9,
    firstName: "amirhossein",
    secondName: "abdol",
    webname: "abdol",
    club: "ghughuz",
    role: "Defenders",
    positionNum: 2,
    isPlaying: true,
    playerStats: {
      id: 11,
      price: 40,
      score: 60,
      weekId: 2,
    },
  },
];

const team: TeamOutputType = {
  id: 1,
  userId: 2,
  name: "ali's team",
  credit: 57,
  players: players,
};

describe("Replacement Log Repo Test", () => {
  beforeAll(async () => {
    dotenv.config();

    configTestServer = async () => server;
    closeTestServer = async () => await server?.close();

    const { sequelize, redis } = await deployInfrastructure("test");
    const { repos, services } = initDomain(sequelize, redis);

    await expect(configTestServer()).resolves.not.toThrowError();

    replacementLogRepo = repos.replacementLogRepo;
    weekRepo = repos.weekRepo;
    userRepo = repos.userRepo;
    refreshService = services.refreshService;
    teamService = services.teamService;
    await weekRepo.refreshWeeks(weeks);
    user = await userRepo.create(usersInfo[0]);
    await refreshService.refreshPlayers(players);
    await teamService.getTeamByUserId(user.id);
    await teamService.addPlayer(user.id, players[0].id, players[0].positionNum);
    await teamService.addPlayer(user.id, players[1].id, players[1].positionNum);

    await teamService.addPlayer(user.id, players[2].id, players[2].positionNum);
  });

  afterEach(async () => {
    await ReplacementLog?.destroy({ where: {} });
  });

  test("recode very first log ", async () => {
    try {
      const currentWeek = await weekRepo.getCurrentWeek();
      const team = await teamService.getTeamByUserId(user.id);

      const record = {
        weekId: currentWeek.id,
        teamId: team!.id,
        oldPlayerId: players[0].id,
        newPlayerId: players[1].id,
        position: players[0].positionNum!,
      };

      const log = await replacementLogRepo.recordLog(record);

      expect(log).toStrictEqual({
        weekId: currentWeek.id,
        teamId: team!.id,
        oldPlayerId: players[0].id,
        newPlayerId: players[1].id,
        position: players[0].positionNum!,
      });
    } catch (e) {
      console.log("error: ", e);
    }
  });

  test("get recordes of a position ", async () => {
    try {
      const currentWeek = await weekRepo.getCurrentWeek();
      const team = await teamService.getTeamByUserId(user.id);

      const record1 = {
        weekId: currentWeek.id,
        teamId: team!.id,
        oldPlayerId: players[0].id,
        newPlayerId: players[1].id,
        position: players[0].positionNum!,
      };
      await replacementLogRepo.recordLog(record1);

      const record2 = {
        weekId: currentWeek.id,
        teamId: team!.id,
        oldPlayerId: players[1].id,
        newPlayerId: players[2].id,
        position: players[0].positionNum!,
      };
      await replacementLogRepo.recordLog(record2);

      const records = await replacementLogRepo.getPositionRecordes(
        currentWeek.id,
        team!.id,
        players[0].positionNum!
      );
      console.log(records);
      expect(records).toStrictEqual([
        {
          weekId: currentWeek.id,
          teamId: team!.id,
          oldPlayerId: players[0].id,
          newPlayerId: players[1].id,
          position: players[0].positionNum!,
        },
        {
          weekId: currentWeek.id,
          teamId: team!.id,
          oldPlayerId: players[1].id,
          newPlayerId: players[2].id,
          position: players[0].positionNum!,
        },
      ]);
    } catch (e) {
      console.log("error: ", e);
    }
  });

  afterAll(async () => {
    await closeTestServer();
  });
});
