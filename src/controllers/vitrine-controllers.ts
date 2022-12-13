// import HttpError from "../errors/http-error";
import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

export class VitrineController implements VitrineControllerInterface {
  constructor(private vitrineService: VitrineServiceInterface) {}

  like: RequestHandler = async (req, res, next) => {
    try {
      const { userId, weekId } = z
        .object({
          userId: z.string().regex(/^\d+$/).default("1").transform(Number),
          weekId: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.query);
      const status = await this.vitrineService.like(req.userId, userId, weekId);
      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };

  unlike: RequestHandler = async (req, res, next) => {
    try {
      const { userId, weekId } = z
        .object({
          userId: z.string().regex(/^\d+$/).default("1").transform(Number),
          weekId: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.query);
      const status = await this.vitrineService.unlike(
        req.userId,
        userId,
        weekId
      );
      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };
  getFollowingVitrines: RequestHandler = async (req, res, next) => {
    try {
      const { weekNum } = z
        .object({
          weekNum: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.params);
      const status = await this.vitrineService.getFollowingVitrines(
        req.userId,
        weekNum
      );
      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };
}
