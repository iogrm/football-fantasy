import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

export class UserController implements UserControllerInterface {
  constructor(private userService: UserServiceInterface) {}

  getUser: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = z
        .object({
          userId: z.string().regex(/^\d+$/).default("1").transform(Number),
        })
        .parse(req.params);

      const user = await this.userService.getUser(req.userId, userId);

      if (user instanceof HttpError) user.throw();
      else return res.json({ user });
    } catch (err) {
      handleError(err);
    }
  };

  getPaginatedUsers: RequestHandler = async (req, res, next) => {
    try {
      console.log("sssss");

      const { search, page, num } = z
        .object({
          num: z.string().regex(/^\d+$/).default("20").transform(Number),
          page: z.string().regex(/^\d+$/).default("1").transform(Number),
          search: z.string().default(""),
        })
        .parse(req.query);

      const data = await this.userService.getPaginatedUsers(req.userId, {
        num,
        page,
        search,
      });

      console.log(data);

      return res.json(data);
    } catch (err) {
      handleError(err);
    }
  };

  uploadUserImage: RequestHandler = async (req, res, next) => {
    try {
      const { image } = z.object({ image: z.string() }).parse(req.body);

      const user = await this.userService.updateUserImage(req.userId, image);

      if (user instanceof HttpError) user.throw();
      else return res.json(user);
    } catch (err) {
      handleError(err);
    }
  };
}
