interface LikeRepositoryInterface {
  createLike: (rec: likeType) => Promise<likeType>;
  removeLike: (rec: likeType) => Promise<boolean>;
  isLike: (rec: likeType) => Promise<boolean>;
}
