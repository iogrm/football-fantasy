interface UserRepositoryInterface {
  create: (data: CreateUserInputType) => Promise<UserOutputType>;

  update: (
    userId: number,
    data: Partial<CreateUserInputType>
  ) => Promise<boolean>;

  getUsers: () => Promise<UserOutputType[]>;

  getUserById: (id: number) => Promise<UserOutputType | null>;

  getUsersByIds: (ids: number[]) => Promise<UserOutputType[]>;

  getUserByUsername: (username: string) => Promise<UserOutputType | null>;

  getUserByEmail: (email: string) => Promise<UserOutputType | null>;

  getPaginatedUsers: (data: {
    limit: number;
    skip: number;
    search: string;
  }) => Promise<GetPaginatedType<UserOutputType>>;

  getAuthInfoByUsername: (username: string) => Promise<AuthOutputType | null>;
}
