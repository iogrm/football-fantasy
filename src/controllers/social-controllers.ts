// import HttpError from "../errors/http-error";
import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

export class SocialController implements SocialControllerInterface {
  constructor(private followService: FollowServiceInterface) {}

  getFollowers: RequestHandler = async (req, res, next) => {
    const { num, page } = z
      .object({
        num: z.string().regex(/^\d+$/).default("20").transform(Number),
        page: z.string().regex(/^\d+$/).default("1").transform(Number),
      })
      .parse(req.query);

    try {
      const data = await this.followService.getFollowers({
        userId: req.userId,
        page,
        num,
      });

      if (data instanceof HttpError) data.throw();
      else return res.status(200).json(data);
    } catch (err) {
      handleError(err);
    }
  };

  getFollowings: RequestHandler = async (req, res, next) => {
    try {
      const { num, page } = z
        .object({
          num: z.string().regex(/^\d+$/).default("20").transform(Number),
          page: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.query);

      const data = await this.followService.getFollowings({
        userId: req.userId,
        num,
        page,
      });

      if (data instanceof HttpError) data.throw();
      else return res.status(200).json(data);
    } catch (err) {
      handleError(err);
    }
  };

  follow: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = z
        .object({
          userId: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.params);

      console.log(userId, 32423);

      const status = await this.followService.follow(req.userId, userId);

      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };

  unfollow: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = z
        .object({
          userId: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.params);

      const status = await this.followService.unfollow(req.userId, userId);

      if (status instanceof HttpError) status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };
}
