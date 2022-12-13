interface VitrineServiceInterface {
  getFollowingVitrines: (
    teamId: number,
    weekNum: number
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
