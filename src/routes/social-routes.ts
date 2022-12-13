import express from "express";
import { auth } from "../middleware/check-auth";

export const createSocialRouter = (controller: SocialControllerInterface) => {
  const router = express.Router();
  router.post("/follow/:userId", auth, controller.follow);
  router.delete("/unfollow/:userId", auth, controller.unfollow);
  router.get("/followers", auth, controller.getFollowers);
  router.get("/followings", auth, controller.getFollowings);

  return router;
};
