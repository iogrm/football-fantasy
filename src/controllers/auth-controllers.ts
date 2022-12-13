import { RequestHandler } from "express";
import { z } from "zod";
import { handleError } from "../errors/error-hendler";
import { HttpError } from "../errors/http-error";

export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthServiceInterface) {}

  signup: RequestHandler = async (req, res, next) => {
    try {
      const data = z
        .object({
          username: z.string(),
          firstname: z.string(),
          lastname: z.string(),
          email: z.string().email(),
          country: z.string().default("iran"),
          password: z.string().min(6),
          birthday: z.string().transform((x) => new Date(x)),
        })
        .parse(req.body);
      const status = await this.authService.signup(data);
      if (status instanceof HttpError) return status.throw();
      else return res.status(200).json({ status });
    } catch (err) {
      handleError(err);
    }
  };

  confirmation: RequestHandler = async (req, res, next) => {
    try {
      const data = z
        .object({
          code: z.number(),
          email: z.string().email(),
        })
        .parse(req.body);

      const token = await this.authService.confirmation(data);
      if (token instanceof HttpError) token.throw();
      else return res.status(200).json({ token });
    } catch (err) {
      handleError(err);
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const { username, password } = z
        .object({
          username: z.string(),
          password: z.string(),
        })
        .parse(req.body);

      const token = await this.authService.login(username, password);

      console.log(token);
      if (token instanceof HttpError) token.throw();
      else return res.json({ token });
    } catch (err) {
      handleError(err);
    }
  };
}
