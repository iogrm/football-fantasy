import express from "express";
import { WeekController } from "./week.controller";

export const createWeekRouter = (controller: WeekControllerInterface) => {
  const router = express.Router();

  router.get("/", controller.getWeek);

  return router;
};
