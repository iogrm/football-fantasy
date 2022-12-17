import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createAuthRouter } from "./auth.route";
import AuthService from "./auth.service";

export const authInit = (
  userService: UserServiceInterface,
  redisRepo: RedisRepoInterface,
  router: Router
): AuthService => {
  const authService = new AuthService(userService, redisRepo);
  const authController = new AuthController(authService);
  router.use("/auth", createAuthRouter(authController));
  return authService;
};
