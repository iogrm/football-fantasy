import express, { Router } from "express";
import * as redis from "redis";
import { authInit } from "../auth/auth.component";
import { batchInit } from "../batch/batch.component";
import { followInit } from "../follow/follow.component";
import { playerInit } from "../player/player.component";
import { teamInit } from "../team/team.component";
import { userInit } from "../user/user.component";
import { vitrineInit } from "../vitrine/vitrine.component";
import { weekInit } from "../week/week.component";
import { initRepositories } from "./repo-init";

export const initDomain = (
  models: AllModels,
  redis: redis.RedisClientType,
  router: Router
): AllServisces => {
  const repos = initRepositories({
    models,
    redis,
  });

  const weekService = weekInit(repos.weekRepo, router);

  const { playerService } = playerInit(
    repos.playerRepo,
    repos.playerStatsRepo,
    router
  );

  const teamService: TeamServiceInterface = teamInit(
    repos.teamRepo,
    repos.recrutmentRepo,
    repos.replacementLogRepo,
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
