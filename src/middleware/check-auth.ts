import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AuthError } from "../errors/authentication-error";

export const auth: RequestHandler = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token =
      req.headers.authorization!.split(" ")[1] ?? req.headers.authorization;
    if (!token) return new AuthError();

    const decodedToken = jwt.verify(
      token,
      process.env.SUPER_SECRET_KEY ?? ""
    ) as JwtPayloadType;

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    console.log(err);

    return new AuthError().throw();
  }
};
