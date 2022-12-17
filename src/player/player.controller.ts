import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

const PlayerRoles: PlayerRolesArrayType = [
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards",
];

export const playerFilter = [...PlayerRoles, "All"] as const;

export class PlayerController implements PlayerControllerInterface {
  constructor(private playerService: PlayerServiceInterface) {}

  getPaginatedPlayers: RequestHandler = async (req, res, next) => {
    try {
      const inputs = z
        .object({
          num: z.string().regex(/^\d+$/).default("20").transform(Number),
          page: z.string().regex(/^\d+$/).default("1").transform(Number),
          search: z.string().default(""),
          role: z.enum(playerFilter).default("All"),
          order: z.string().default("DESC"),
          sortBy: z.string().default("price"),
        })
        .parse(req.query);

      let data = await this.playerService.getPaginatedPlayers(inputs);

      return res.status(200).json(data);
    } catch (err) {
      handleError(err);
    }
  };

  getPlayer: RequestHandler = async (req, res, next) => {
    try {
      const { playerId } = z
        .object({ playerId: z.string().regex(/^\d+$/).transform(Number) })
        .parse(req.params);

      let player = await this.playerService.getPlayerById(playerId);

      if (player instanceof HttpError) player.throw();
      else res.status(200).json({ player });
    } catch (err) {
      handleError(err);
    }
  };
}
