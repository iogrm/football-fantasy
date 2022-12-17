import { PlayerController } from "../player/player.controller";
import { TeamController } from "../team/team.controller";
import { AuthController } from "../auth/auth.controller";
import { WeekController } from "../week/week.controller";
import { UserController } from "../user/user.controller";
import { VitrineController } from "../vitrine/vitrine.controller";
import { FollowController } from "../follow/follow.controller";

export const initControllers = (deps: AllServisces): AllControllers => ({
  playerController: new PlayerController(deps.playerService),
  teamController: new TeamController(deps.teamService),
  authController: new AuthController(deps.authService),
  weekController: new WeekController(deps.weekService),
  socialController: new FollowController(deps.followService),
  userController: new UserController(deps.userService),
  vitrineController: new VitrineController(deps.vitrineService),
});
