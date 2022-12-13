import { HttpError } from "./http-error";

export class InvalidInputError extends HttpError {
  constructor(data: { [field: string]: string[] | undefined }) {
    super(400, "InvalidInput", "ورودی شما نامعتبر است", data);
  }
}
