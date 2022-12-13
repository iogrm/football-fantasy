import express from "express";
import { auth } from "../middleware/check-auth";

export const createVitrineRouter = (controller: VitrineControllerInterface) => {
  const router = express.Router();
  router.get("/followings/:weekNum", auth, controller.getFollowingVitrines);
  router.post("/like/", auth, controller.like);
  router.delete("/unlike/", auth, controller.unlike);

  return router;
};
