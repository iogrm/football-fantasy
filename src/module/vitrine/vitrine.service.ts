import { NotFoundError } from "../../error/not-found-error";
import UserDto from "../user/user.dto";

class VitrineService implements VitrineServiceInterface {
  constructor(
    private likeRepo: LikeRepositoryInterface,
    private teamService: TeamServiceInterface,
    private followService: FollowServiceInterface,
    private userSerivce: UserServiceInterface,
    private weekService: WeekServiceInterface
  ) {}

  getUserVitrine = async (
    requestedUserId: number,
    userId: number
  ): Promise<LongUserOutputType | NotFoundErrorType> => {
    const user = await this.userSerivce.getUserById(userId);
    if (!user) return new NotFoundError("User");

    let isFollowed = await this.followService.checkIsFollowed(
      userId,
      requestedUserId
    );
    let score = await this.getScore(userId);

    if (score instanceof NotFoundError) score = -1;
    return { ...UserDto.convertToFollowedUserOutput(user, isFollowed), score };
  };

  getFollowingVitrines = async ({
    weekNum,
    userId,
    page,
    num,
  }: GetVitrineType): Promise<followingVitrinesType | NotFoundErrorType> => {
    const followings = await this.followService.getFollowings({
      userId,
      page,
      num,
    });

    const week = await this.weekService.getWeekByNumber(weekNum);
    if (!week || week instanceof NotFoundError)
      return new NotFoundError("Week");

    let vitrines: followingVitrinesType = [];
    for (let f = 0; f < followings.count; f++) {
      let vitrine = await this.getVitrine(week, followings.values[f].id);
      if (vitrine instanceof NotFoundError) return vitrine;
      const record = {
        weekId: week.id,
        likerId: userId,
        likeeId: followings.values[f].id,
      };
      let isLike = await this.likeRepo.isLike(record);
      const vitrinep: vitrineplusType = { ...vitrine, isLike };
      vitrines.push(vitrinep);
    }
    return vitrines;
  };

  like = async (
    likerId: number,
    likeeId: number,
    weekId: number
  ): Promise<likeType | NotFoundErrorType> => {
    const week = await this.weekService.getWeekById(weekId);
    if (!week || week instanceof NotFoundError)
      return new NotFoundError("Week");
    const record = {
      weekId: week.id,
      likerId,
      likeeId,
    };
    let like = await this.likeRepo.createLike(record);
    return like;
  };

  unlike = async (
    likerId: number,
    likeeId: number,
    weekId: number
  ): Promise<boolean | NotFoundErrorType> => {
    const week = await this.weekService.getWeekById(weekId);
    if (!week || week instanceof NotFoundError)
      return new NotFoundError("Week");
    const record = {
      weekId: week.id,
      likerId,
      likeeId,
    };
    let rec = await this.likeRepo.removeLike(record);
    return true;
  };

  getVitrine = async (
    week: WeekOutputType,
    userId: number
  ): Promise<vitrineType | NotFoundErrorType> => {
    const team = await this.teamService.getTeamByUserId(userId);
    if (!team) return new NotFoundError("Team");

    const user: UserOutputType | null = await this.userSerivce.getUserById(
      userId
    );
    if (!user) return new NotFoundError("User");

    const records: PositionRecordesType =
      await this.teamService.getTeamRecordes(week.id, team.id);
    const score = await this.getScore(userId);
    if (score instanceof NotFoundError) return score;
    else return { records, user, score, week: week.number };
  };

  getScore = async (userId: number): Promise<number | NotFoundErrorType> => {
    const team = await this.teamService.getFeildTeamByUserId(userId);
    if (!team) return new NotFoundError("Team");
    let scores = 0;
    team.players.map((player) => (scores += player.playerStats.score));
    return scores;
  };
}

export default VitrineService;
