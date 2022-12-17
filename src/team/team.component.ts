import { Router } from "express";
import PlayerRepository from "../player/player.repo";
import PlayerService from "../player/player.service";
import RecrutmentRepository from "../repos/recrutment.repo";
import ReplacementLogRepository from "../repos/replacement-log.repo";
import WeekRepository from "../week/week.repo";
import { TeamController } from "./team.controller";
import TeamRepository from "./team.repo";
import { createTeamRouter } from "./team.route";
import TeamService from "./team.service";

export const teamInit = (
  teamRepo: TeamRepositoryInterface,
  recrutmentRepo: RecrutmentRepositoryInterface,
  replacementLogRepo: ReplacementLogRepositoryInterface,

  playerService: PlayerServiceInterface,
  weekService: WeekServiceInterface,
  router: Router
): TeamService => {
  const teamService = new TeamService(
    teamRepo,
    recrutmentRepo,
    replacementLogRepo,
    playerService,
    weekService
  );
  const teamController = new TeamController(teamService);
  router.use("/team", createTeamRouter(teamController));
  return teamService;
};
