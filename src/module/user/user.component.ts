import { Router } from "express";
import { UserController } from "./user.controller";
import UserRepository from "../../repo/sequelize/repo/user.repo";
import { createUserRouter } from "./user.route";
import UserService from "./user.service";

export const userInit = (
  userRepo: UserRepositoryInterface,
  router: Router
): UserService => {
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);
  router.use("/user", createUserRouter(userController));
  return userService;
};
