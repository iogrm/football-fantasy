import { Router } from 'express';
import ReplacementLogRepository from '../sequelize/repo/replacement.repo';
import FollowRepository from '../sequelize/repo/follow.repo';
import TeamRepository from '../sequelize/repo/team.repo';
import UserRepository from '../sequelize/repo/user.repo';
import WeekRepository from '../sequelize/repo/week.repo';
import LikeRepository from '../sequelize/repo/like.repo';
import { VitrineController } from './vitrine.controller';
import { createVitrineRouter } from './vitrine.route';
import VitrineService from './vitrine.service';

export const vitrineInit = (
  likeRepo: LikeRepositoryInterface,
  weekService: WeekServiceInterface,
  teamService: TeamServiceInterface,
  followService: FollowServiceInterface,
  userSerivce: UserServiceInterface,
  router: Router
): VitrineService => {
  const vitrineService = new VitrineService(
    likeRepo,
    teamService,
    followService,
    userSerivce,
    weekService
  );
  const vitrineController = new VitrineController(vitrineService);
  router.use('/vitrine', createVitrineRouter(vitrineController));
  return vitrineService;
};
