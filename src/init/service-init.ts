import PlayerService from "../services/player-service";
import TeamService from "../services/team-service";
import AuthService from "../services/auth-service";
import WeekService from "../services/week-service";
import FollowService from "../services/follow-service";
import RefreshService from "../services/refresh-service";
import VitrineService from "../services/vitrine-service";
import UserService from "../services/user-service";

export const initServices = (deps: AllRepositories): AllServisces => {
  let vitrineService = new VitrineService(
    deps.replacementLogRepo,
    deps.weekRepo,
    deps.teamRepo,
    deps.followRepo,
    deps.likeRepo,
    deps.userRepo
  );

  return {
    playerService: new PlayerService(deps.playerRepo, deps.playerStatsRepo),
    teamService: new TeamService(
      deps.recrutmentRepo,
      deps.playerRepo,
      deps.teamRepo,
      deps.replacementLogRepo,
      deps.weekRepo
    ),
    authService: new AuthService(deps.userRepo, deps.redisRepo),
    weekService: new WeekService(deps.weekRepo),
    followService: new FollowService(deps.followRepo, deps.userRepo),
    refreshService: new RefreshService(
      deps.weekRepo,
      deps.playerRepo,
      deps.playerStatsRepo
    ),
    userService: new UserService(
      deps.userRepo,
      deps.followRepo,
      vitrineService
    ),
    vitrineService,
  };
};
