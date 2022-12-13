import express from "express";
import { createPlayerRouter } from "../routes/players-routes";
import { createAuthRouter } from "../routes/auth-routes";
import { createTeamRouter } from "../routes/teams-routes";
import { createWeekRouter } from "../routes/week-routes";
import { createSocialRouter } from "../routes/social-routes";
import { createUserRouter } from "../routes/user-routes";
import { createVitrineRouter } from "../routes/vitrine-routes";

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
