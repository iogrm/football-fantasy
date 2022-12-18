import { Router } from 'express';
import { WeekController } from './week.controller';
import { createWeekRouter } from './week.route';
import WeekService from './week.service';

export const weekInit = (
  weekRepository: WeekRepositoryInterface,
  router: Router
): WeekServiceInterface => {
  const weekService = new WeekService(weekRepository);
  const weekController = new WeekController(weekService);
  router.use('/week', createWeekRouter(weekController));
  return weekService;
};
