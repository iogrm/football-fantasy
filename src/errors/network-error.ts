import { HttpError } from "./http-error";

export class TimeoutError extends HttpError {
  constructor() {
    super(408, `Request Timeout`, "نت نداریم حاجی");
  }
}
