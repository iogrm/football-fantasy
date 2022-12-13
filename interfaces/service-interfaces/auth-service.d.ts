interface AuthServiceInterface {
  signup: (data: CreateUserInputType) => Promise<boolean | DuplicateErrorType>;

  confirmation: (data: {
    email: string;
    code: number;
  }) => Promise<string | BadRequestErrorType | NotFoundErrorType>;

  login: (
    username: string,
    password: string
  ) => Promise<string | BadRequestErrorType | NotFoundErrorType>;
}
