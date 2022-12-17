import PlayerService from "../player/player.service";
import TeamService from "../team/team.service";
import AuthService from "../auth/auth.service";
import WeekService from "../week/week.service";
import FollowService from "../follow/follow.service";
import VitrineService from "../vitrine/vitrine.service";
import UserService from "../user/user.service";
import BatchService from "../batch/batch.service";

export const initServices = (deps: AllRepositories): AllServisces => {
  const vitrineService = new VitrineService(
    deps.replacementLogRepo,
    deps.weekRepo,
    deps.teamRepo,
    deps.followRepo,
    deps.likeRepo,
    deps.userRepo
  );

  const playerService = new PlayerService(
    deps.playerRepo,
    deps.playerStatsRepo
  );
  const teamService = new TeamService(
    deps.recrutmentRepo,
    deps.playerRepo,
    deps.teamRepo,
    deps.replacementLogRepo,
    deps.weekRepo
  );
  const authService = new AuthService(deps.userRepo, deps.redisRepo);
  const weekService = new WeekService(deps.weekRepo);
  const followService = new FollowService(deps.followRepo, deps.userRepo);
  const userService = new UserService(
    deps.userRepo,
    deps.followRepo,
    vitrineService
  );
  const batchService = new BatchService(weekService, playerService);

  return {
    playerService,
    teamService,
    authService,
    weekService,
    followService,
    userService,
    vitrineService,
    batchService,
  };
};
