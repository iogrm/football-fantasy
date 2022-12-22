import { UserModel } from "../../src/module/user/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}
