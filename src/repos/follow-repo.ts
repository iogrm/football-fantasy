import FollowDao from "../dao/follow-dao";

class FollowRepository implements FollowRepositoryInterface {
  constructor(private followModel: FollowModelType) {}
  createFollow = async (
    followerId: number,
    followingId: number
  ): Promise<FollowOutputType> => {
    let rec = await this.followModel.create({
      followerId,
      followingId,
    });

    return FollowDao.convertFollow(rec);
  };

  checkIsFollowed = async (followerId: number, followingId: number) => {
    let follow = await this.followModel.findOne({
      where: { followerId, followingId },
    });

    return !!follow;
  };

  removeFollow = async (followerId: number, followingId: number) => {
    let rec = await this.followModel.destroy({
      where: { followerId, followingId },
    });
    return rec;
  };

  getFollowers = async (followingId: number): Promise<FollowerId[]> => {
    const followers = await this.followModel.findAll({
      where: {
        followingId: followingId,
      },
    });
    return FollowDao.convertFollowers(followers);
  };

  getFollowings = async (followerId: number): Promise<FollowingId[]> => {
    const followings = await this.followModel.findAll({
      where: {
        followerId: followerId,
      },
    });

    return FollowDao.convertFollowings(followings);
  };
}

export default FollowRepository;
