type GetVitrineType = { weekNum: number } & GetFollowType;

interface VitrineServiceInterface {
  getFollowingVitrines: (
    data: GetVitrineType
  ) => Promise<followingVitrinesType | NotFoundErrorType>;

  like: (
    likerId: number,
    likeeId: number,
    weekId: number
  ) => Promise<likeType | NotFoundErrorType>;

  unlike: (
    likerId: number,
    likeeId: number,
    weekId: number
  ) => Promise<boolean | NotFoundErrorType>;

  getScore: (userId: number) => Promise<number | NotFoundErrorType>;
}
