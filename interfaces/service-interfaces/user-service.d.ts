interface UserServiceInterface {
  getUser: (
    requestedUserId: number,
    userId: number
  ) => Promise<UserOutputType | NotFoundErrorType>;

  getFollowedUsers: (
    users: UserOutputType[],
    userId: number
  ) => Promise<ShortUserOutputType[]>;

  updateUserImage: (
    userId: number,
    profileImage: string
  ) => Promise<ShortUserOutputType | NotFoundErrorType>;

  getPaginatedUsers: (
    userId: number,
    data: GetPaginatedType & { search: string }
  ) => Promise<PaginatedOutputType<ShortUserOutputType>>;
}
