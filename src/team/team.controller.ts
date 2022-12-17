import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

export class TeamController implements TeamControllerInterface {
  constructor(private teamService: TeamServiceInterface) {}

  getTeam: RequestHandler = async (req, res, next) => {
    try {
      const team = await this.teamService.getTeamByUserId(req.userId);

      res.status(200).json({ team });
    } catch (err) {
      handleError(err);
    }
  };

  addPlayer: RequestHandler = async (req, res, next) => {
    try {
      const { position_num, player_id } = z
        .object({
          position_num: z.number(),
          player_id: z.number(),
        })
        .parse(req.body);

      let team = await this.teamService.addPlayer(
        req.userId,
        player_id,
        position_num
      );

      if (team instanceof HttpError) team.throw();
      else return res.status(201).json({ team });
    } catch (err) {
      handleError(err);
    }
  };

  removePlayer: RequestHandler = async (req, res, next) => {
    try {
      const { position_num } = z
        .object({
          position_num: z.string().regex(/^\d+$/).transform(Number),
        })
        .parse(req.query);

      const team = await this.teamService.removePlayer(
        req.userId,
        position_num
      );

      if (team instanceof HttpError) team.throw();
      else return res.status(200).json({ team });
    } catch (err) {
      handleError(err);
    }
  };

  swapPlayers: RequestHandler = async (req, res, next) => {
    try {
      const { position1, position2 } = z
        .object({
          position1: z.string().regex(/^\d+$/).transform(Number),
          position2: z.string().regex(/^\d+$/).transform(Number),
        })
        .parse(req.query);

      const team = await this.teamService.swapPlayers(
        req.userId,
        position1,
        position2
      );

      if (team instanceof HttpError) team.throw();
      else return res.status(200).json({ team });
    } catch (err) {
      handleError(err);
    }
  };
}
