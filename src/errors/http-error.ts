import { RequestHandler, Response } from "express";
import { BadRequestErrorTypes } from "./bad-request-error";

type ErrorType =
  | BadRequestErrorTypes
  | "Unauthorized"
  | "InvalidInput"
  | "DuplicateError"
  | "NotFoundError"
  | "ServerError"
  | "Request Timeout";

export type ErrorResponseDataType = { errorType: ErrorType; message: string };

export abstract class HttpError {
  private static res: Response;

  constructor(
    protected statusCode: number,
    protected errorType: ErrorType,
    private message: string,
    private errorData: any = undefined
  ) {}

  static init: RequestHandler = (_, res, next) => {
    this.res = res;
    next();
  };

  public throw = () => {
    HttpError.res.status(this.statusCode).json({
      status: false,
      errorType: this.errorType,
      message: this.message,
      errorData: this.errorData,
    });
  };
}
