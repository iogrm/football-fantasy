import express from "express";

export const createPlayerRouter = (controller: PlayerControllerInterface) => {
  const router = express.Router();

  router.get("/all", controller.getPaginatedPlayers);
  router.get("/:playerId", controller.getPlayer);

  return router;
};
