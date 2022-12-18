type DuplicateErrorType =
  import('../../src/error/duplicate-error').DuplicateError;
type BadRequestErrorType =
  import('../../src/error/bad-request-error').BadRequestError;
type AuthenticationErrorType =
  import('../../src/error/authentication-error').AuthError;
type InvalidInputErrorType =
  import('../../src/error/invalid-input-error').InvalidInputError;
type TimeoutErrorType = import('../../src/error/network-error').TimeoutError;
type NotFoundErrorType =
  import('../../src/error/not-found-error').NotFoundError;
type ServerErrorType = import('../../src/error/server-error').ServerError;
type HttpErrorType = import('../../src/error/http-error').HttpError;
