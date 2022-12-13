import { HttpError } from "./http-error";
import { FieldNames, translateFieldName } from "./not-found-error";

export class DuplicateError extends HttpError {
  constructor(field: FieldNames) {
    super(400, "DuplicateError", `${translateFieldName(field)} شما تکراری ست`);
  }
}
