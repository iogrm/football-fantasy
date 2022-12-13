import express from "express";
import { WeekController } from "../controllers/weeks-controllers";

export const createWeekRouter = (controller: WeekControllerInterface) => {
  const router = express.Router();

  router.get("/", controller.getWeek);

  return router;
};
