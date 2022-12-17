import express from "express";
import { createPlayerRouter } from "../player/player.route";
import { createAuthRouter } from "../auth/auth.route";
import { createTeamRouter } from "../team/team.route";
import { createWeekRouter } from "../week/week.route";
import { createSocialRouter } from "../follow/follow.route";
import { createUserRouter } from "../user/user.route";
import { createVitrineRouter } from "../vitrine/vitrine.route";

export const initRouters = (controllers: AllControllers) => {
  const router = express.Router();

  router.use("/player", createPlayerRouter(controllers.playerController));
  router.use("/auth", createAuthRouter(controllers.authController));
  router.use("/user", createUserRouter(controllers.userController));
  router.use("/team", createTeamRouter(controllers.teamController));
  router.use("/social", createSocialRouter(controllers.socialController));
  router.use("/vitrine", createVitrineRouter(controllers.vitrineController));
  router.use("/week", createWeekRouter(controllers.weekController));

  return router;
};
