interface FollowRepositoryInterface {
  getFollowers: (id: number) => Promise<FollowerId[]>;
  getFollowings: (id: number) => Promise<FollowingId[]>;
  createFollow: (id: number, id: number) => Promise<FollowOutputType>;
  removeFollow: (id: number, id: number) => Promise<number>;
  checkIsFollowed: (
    followerId: number,
    followingId: number
  ) => Promise<boolean>;
}
