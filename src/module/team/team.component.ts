import { Router } from "express";
import PlayerRepository from "../../repo/sequelize/repo/player.repo";
import PlayerService from "../player/player.service";
import RecrutmentRepository from "../../repo/sequelize/repo/recrutment.repo";
import ReplacementLogRepository from "../../repo/sequelize/repo/replacement.repo";
import WeekRepository from "../../repo/sequelize/repo/week.repo";
import { TeamController } from "./team.controller";
import TeamRepository from "../../repo/sequelize/repo/team.repo";
import { createTeamRouter } from "./team.route";
import TeamService from "./team.service";

export const teamInit = (
  teamRepo: TeamRepositoryInterface,
  recrutmentRepo: RecrutmentRepositoryInterface,
  replacementLogRepo: ReplacementRepositoryInterface,

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
