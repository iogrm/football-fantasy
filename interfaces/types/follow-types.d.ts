type FollowOutputType = {
  followerId: number;
  followingId: number;
};

type FollowerId = number;
type FollowingId = number;

type FollowersOutputType = {
  userId: number;
  followers: (ShortUserOutputType | null)[];
};

type FollowingsOutputType = {
  userId: number;
  followings: (ShortUserOutputType | null)[];
};
