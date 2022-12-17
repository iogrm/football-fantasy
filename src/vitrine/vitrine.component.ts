import { Router } from "express";
import ReplacementLogRepository from "../repos/replacement-log.repo";
import FollowRepository from "../follow/follow.repo";
import TeamRepository from "../team/team.repo";
import UserRepository from "../user/user.repo";
import WeekRepository from "../week/week.repo";
import LikeRepository from "./like.repo";
import { VitrineController } from "./vitrine.controller";
import { createVitrineRouter } from "./vitrine.route";
import VitrineService from "./vitrine.service";

export const vitrineInit = (
  likeRepo: LikeRepositoryInterface,
  weekService: WeekServiceInterface,
  teamService: TeamServiceInterface,
  followService: FollowServiceInterface,
  userSerivce: UserServiceInterface,
  router: Router
): VitrineService => {
  const vitrineService = new VitrineService(
    likeRepo,
    teamService,
    followService,
    userSerivce,
    weekService
  );
  const vitrineController = new VitrineController(vitrineService);
  router.use("/vitrine", createVitrineRouter(vitrineController));
  return vitrineService;
};
