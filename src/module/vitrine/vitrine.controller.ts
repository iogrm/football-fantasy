// import HttpError from "../errors/http-error";
import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../../error/error-hendler";
import { HttpError } from "../../error/http-error";

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
      const { weekNum, num, page } = z
        .object({
          weekNum: z.string().regex(/^\d+$/).default("1").transform(Number),
          num: z.string().regex(/^\d+$/).default("20").transform(Number),
          page: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.params);
      const status = await this.vitrineService.getFollowingVitrines({
        weekNum,
        userId: req.userId,
        page,
        num,
      });
      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };
}
