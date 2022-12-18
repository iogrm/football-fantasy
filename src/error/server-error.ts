import { HttpError } from "./http-error";

export class ServerError extends HttpError {
  constructor() {
    super(500, "ServerError", "مشکلی پیش آمده است.");
  }
}
