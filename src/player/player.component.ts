import { Router } from "express";
import PlayerStatsRepository from "../repos/player-stats.repo";
import { PlayerController } from "./player.controller";
import PlayerRepository from "./player.repo";
import { createPlayerRouter } from "./player.route";
import PlayerService from "./player.service";

export const playerInit = (
  playerRepository: PlayerRepositoryInterface,
  playerStatsRepo: PlayerStatsRepositoryInterface,
  router: Router
) => {
  const playerService = new PlayerService(playerRepository, playerStatsRepo);
  const playerController = new PlayerController(playerService);
  router.use("/player", createPlayerRouter(playerController));
  return { playerService, playerRepo: playerRepository };
};
