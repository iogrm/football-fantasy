import FollowDto from "../dto/follow-dto";
import UserDto from "../dto/user-dto";
import { DuplicateError } from "../errors/duplicate-error";
import { HttpError } from "../errors/http-error";
import { NotFoundError } from "../errors/not-found-error";

class FollowService implements FollowServiceInterface {
  constructor(
    private followRepo: FollowRepositoryInterface,
    private userRepo: UserRepositoryInterface
  ) {}

  private getFollowedUsers = async (
    users: UserOutputType[],
    userId: number
  ): Promise<FollowedUserOutputType[]> => {
    return await Promise.all(
      users.map(async (user) => {
        let isFollowed = await this.followRepo.checkIsFollowed(user.id, userId);

        return UserDto.convertToFollowedUserOutput(user, isFollowed);
      })
    );
  };

  follow = async (
    followerId: FollowerId,
    followingId: FollowingId
  ): Promise<boolean | DuplicateErrorType | NotFoundErrorType> => {
    if (followerId === followingId) return new DuplicateError("User");

    const follower = await this.userRepo.getUserById(followerId);
    if (!follower) return new NotFoundError("User");
    const following = await this.userRepo.getUserById(followingId);
    if (!following) return new NotFoundError("User");

    const followings = await this.followRepo.getFollowings(followerId);
    const f = followings.find((f) => f === followingId);
    if (f) return new DuplicateError("User");

    const follow = await this.followRepo.createFollow(followerId, followingId);
    return !!follow;
  };

  unfollow = async (
    followerId: number,
    followingId: number
  ): Promise<boolean | NotFoundErrorType> => {
    const follower = await this.userRepo.getUserById(followerId);
    if (!follower) return new NotFoundError("User");
    const following = await this.userRepo.getUserById(followingId);
    if (!following) return new NotFoundError("User");

    const followings = await this.followRepo.getFollowings(followerId);
    const f = followings.find((f) => f === followingId);
    if (!f) return new NotFoundError("User");

    const removedNum = await this.followRepo.removeFollow(
      followerId,
      followingId
    );

    if (removedNum > 1) console.log("!!! ---- something bad happend...");

    return !!removedNum;
  };

  getFollowers = async ({ userId, page, num }: GetFollowType) => {
    const followerIds = await this.followRepo.getFollowers(userId);
    let users = await this.userRepo.getUsersByids(
      followerIds.slice((page - 1) * num, page * num)
    );

    let followUsers: FollowedUserOutputType[] = await this.getFollowedUsers(
      users,
      userId
    );

    return FollowDto.convertGetPaginatedFollow(followerIds.length, followUsers);
  };

  getFollowings = async ({
    userId,
    page,
    num,
  }: GetFollowType): Promise<PaginatedOutputType<ShortUserOutputType>> => {
    const followingIds = await this.followRepo.getFollowings(userId);
    const users = await this.userRepo.getUsersByids(
      followingIds.slice((page - 1) * num, page * num)
    );

    let followUsers: FollowedUserOutputType[] = await this.getFollowedUsers(
      users,
      userId
    );

    return FollowDto.convertGetPaginatedFollow(
      followingIds.length,
      followUsers
    );
  };
}

export default FollowService;
