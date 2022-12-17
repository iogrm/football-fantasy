import { Router } from "express";
import { FollowController } from "./follow.controller";
import FollowRepository from "./follow.repo";
import { createSocialRouter } from "./follow.route";
import FollowService from "./follow.service";

export const followInit = (
  followRepo: FollowRepositoryInterface,
  userService: UserServiceInterface,
  router: Router
): FollowService => {
  const followService = new FollowService(followRepo, userService);
  const followController = new FollowController(followService);
  router.use("/social", createSocialRouter(followController));
  return followService;
};
