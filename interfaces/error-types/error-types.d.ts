type DuplicateErrorType =
  import("../../src/errors/duplicate-error").DuplicateError;
type BadRequestErrorType =
  import("../../src/errors/bad-request-error").BadRequestError;
type AuthenticationErrorType =
  import("../../src/errors/authentication-error").AuthError;
type InvalidInputErrorType =
  import("../../src/errors/invalid-input-error").InvalidInputError;
type TimeoutErrorType = import("../../src/errors/network-error").TimeoutError;
type NotFoundErrorType =
  import("../../src/errors/not-found-error").NotFoundError;
type ServerErrorType = import("../../src/errors/server-error").ServerError;
type HttpErrorType = import("../../src/errors/http-error").HttpError;
