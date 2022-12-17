interface UserServiceInterface {
  getUser: (
    requestedUserId: number,
    userId: number
  ) => Promise<UserOutputType | NotFoundErrorType>;

  updateUserImage: (
    userId: number,
    profileImage: string
  ) => Promise<ShortUserOutputType | NotFoundErrorType>;

  getPaginatedUsers: (
    data: GetPaginatedType & { search: string }
  ) => Promise<PaginatedOutputType<UserOutputType>>;

  getUserById: (id: number) => Promise<UserOutputType | null>;

  getUsersByIds: (ids: number[]) => Promise<UserOutputType[]>;

  getUserByUsername: (username: string) => Promise<UserOutputType | null>;

  getUserByEmail: (email: string) => Promise<UserOutputType | null>;

  getAuthInfoByUsername: (username: string) => Promise<AuthOutputType | null>;
  createUser: (data: CreateUserInputType) => Promise<UserOutputType>;
}
