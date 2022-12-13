import LikeDao from "../dao/like-dao";

class LikeRepository implements LikeRepositoryInterface {
  constructor(private LikeModel: LikeModelType) {}

  createLike = async (rec: likeType): Promise<likeType> => {
    let record = {
      weekId: rec.weekId,
      likerId: rec.likerId,
      likeeId: rec.likeeId,
    };

    let like = await this.LikeModel.create(record);
    return LikeDao.convertLike(like);
  };

  removeLike = async (rec: likeType): Promise<boolean> => {
    let record = {
      weekId: rec.weekId,
      likerId: rec.likerId,
      likeeId: rec.likeeId,
    };

    let unlike = await this.LikeModel.destroy({
      where: record,
    });

    return true;
  };

  isLike = async (rec: likeType): Promise<boolean> => {
    let record = {
      weekId: rec.weekId,
      likerId: rec.likerId,
      likeeId: rec.likeeId,
    };
    let like = await this.LikeModel.findAll({
      where: record,
    });
    if (like.length > 0) return true;
    return false;
  };
}

export default LikeRepository;
