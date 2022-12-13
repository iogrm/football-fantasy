import { PlayerController } from "../controllers/players-controllers";
import { TeamController } from "../controllers/teams-controllers";
import { AuthController } from "../controllers/auth-controllers";
import { WeekController } from "../controllers/weeks-controllers";
import { SocialController } from "../controllers/social-controllers";
import { UserController } from "../controllers/user-controllers";
import { VitrineController } from "../controllers/vitrine-controllers";

export const initControllers = (deps: AllServisces): AllControllers => ({
  playerController: new PlayerController(deps.playerService),
  teamController: new TeamController(deps.teamService),
  authController: new AuthController(deps.authService),
  weekController: new WeekController(deps.weekService),
  socialController: new SocialController(deps.followService),
  userController: new UserController(deps.userService),
  vitrineController: new VitrineController(deps.vitrineService),
});
