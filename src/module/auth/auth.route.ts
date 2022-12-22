import express from "express";

export const createAuthRouter = (controller: AuthControllerInterface) => {
  const router = express.Router();

  router.post("/signup", controller.signup);
  router.post("/confirmation", controller.confirmation);
  router.post("/login", controller.login);

  return router;
};
