import express from "express";
import { auth } from "../middleware/check-auth";

export const createTeamRouter = (controller: TeamControllerInterface) => {
  const router = express.Router();

  router.get("/", auth, controller.getTeam);
  router.post("/player", auth, controller.addPlayer);
  router.delete("/player", auth, controller.removePlayer);
  router.put("/player", auth, controller.swapPlayers);

  return router;
};
