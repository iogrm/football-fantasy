import { UserModel } from "../../src/user/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}
