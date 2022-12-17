import { Router } from "express";
import WeekRepository from "./week.repo";
import { createWeekRouter } from "./week.route";
import WeekService from "./week.service";
import { WeekController } from "./week.controller";

export const weekInit = (
  weekRepository: WeekRepositoryInterface,
  router: Router
): WeekServiceInterface => {
  const weekService = new WeekService(weekRepository);
  const weekController = new WeekController(weekService);
  router.use("/week", createWeekRouter(weekController));
  return weekService;
};
