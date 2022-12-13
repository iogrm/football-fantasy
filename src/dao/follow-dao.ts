import Follow from "../models/follow";

export default abstract class FollowDao {
  static convertFollow = (model: Follow): FollowOutputType => {
    const user = {
      followerId: model.followerId,
      followingId: model.followingId,
      // followedAt: model.createdAt,
    };
    return user;
  };

  static convertFollowers = (models: Follow[]): FollowerId[] => {
    const followers = models.map((model) => model.followerId);
    return followers;
  };

  static convertFollowings = (models: Follow[]): FollowingId[] => {
    const followings = models.map((model) => model.followingId);
    return followings;
  };
}
