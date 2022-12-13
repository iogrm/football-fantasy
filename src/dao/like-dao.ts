import Like from "../models/like";

export default abstract class LikeDao {
  static convertLike = (model: Like): likeType => {
    const like = {
      likerId: model.likerId,
      likeeId: model.likeeId,
      weekId: model.weekId,
    };
    return like;
  };
}
