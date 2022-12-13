type GetFollowType = { userId: number } & GetPaginatedType;

interface FollowServiceInterface {
  follow: (
    followerId: number,
    followingId: number
  ) => Promise<boolean | DuplicateErrorType | NotFoundErrorType>;
  unfollow: (
    followerId: number,
    followingId: number
  ) => Promise<boolean | NotFoundErrorType>;
  getFollowers: (
    data: GetFollowType
  ) => Promise<PaginatedOutputType<ShortUserOutputType>>;
  getFollowings: (
    data: GetFollowType
  ) => Promise<PaginatedOutputType<ShortUserOutputType>>;
}
