import { Router } from "express";
import { authInit } from "./auth/auth.component";
import { batchInit } from "./batch/batch.component";
import { followInit } from "./follow/follow.component";
import { playerInit } from "./player/player.component";
import { teamInit } from "./team/team.component";
import { userInit } from "./user/user.component";
import { vitrineInit } from "./vitrine/vitrine.component";
import { weekInit } from "./week/week.component";
import { AllRepositories } from "../../interfaces/dependencies/repos";

export const initModule = (
  repos: AllRepositories,
  router: Router
): AllServisces => {
  const weekService = weekInit(repos.weekRepo, router);

  const { playerService } = playerInit(
    repos.playerRepo,
    repos.playerStatusRepo,
    router
  );

  const teamService: TeamServiceInterface = teamInit(
    repos.teamRepo,
    repos.recrutmentRepo,
    repos.replacementRepo,
    playerService,
    weekService,
    router
  );
  const userService: UserServiceInterface = userInit(repos.userRepo, router);

  const followService: FollowServiceInterface = followInit(
    repos.followRepo,
    userService,
    router
  );

  const vitrineService: VitrineServiceInterface = vitrineInit(
    repos.likeRepo,
    weekService,
    teamService,
    followService,
    userService,
    router
  );

  const authService: AuthServiceInterface = authInit(
    userService,
    repos.redisRepo,
    router
  );

  const batchService: BatchServiceInterface = batchInit(
    weekService,
    playerService
  );

  const services: AllServisces = {
    playerService,
    teamService,
    authService,
    userService,
    weekService,
    followService,
    vitrineService,
    batchService,
  };
  return services;
};
