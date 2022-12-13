import { NotFoundError } from "../errors/not-found-error";

class VitrineService implements VitrineServiceInterface {
  constructor(
    private replacementLogRepo: ReplacementLogRepositoryInterface,
    private weekRepo: WeekRepositoryInterface,
    private teamRepo: TeamRepositoryInterface,
    private followRepo: FollowRepositoryInterface,
    private likeRepo: LikeRepositoryInterface,
    private userRepo: UserRepositoryInterface
  ) {}

  getFollowingVitrines = async (
    userId: number,
    weekNum: number
  ): Promise<followingVitrinesType | NotFoundErrorType> => {
    const followings = await this.followRepo.getFollowings(userId);

    const week = await this.weekRepo.getWeekByNumber(weekNum);
    if (!week) return new NotFoundError("Week");

    let vitrines: followingVitrinesType = [];
    for (let f = 0; f < followings.length; f++) {
      let vitrine = await this.getVitrine(week, followings[f]);
      if (vitrine instanceof NotFoundError) return vitrine;
      const record = {
        weekId: week.id,
        likerId: userId,
        likeeId: followings[f],
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
    const week = await this.weekRepo.getWeekById(weekId);
    if (!week) return new NotFoundError("Week");
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
    const week = await this.weekRepo.getWeekById(weekId);
    if (!week) return new NotFoundError("Week");
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
    const team = await this.teamRepo.getTeamByUserId(userId);
    if (!team) return new NotFoundError("Team");

    const user: UserOutputType | null = await this.userRepo.getUserById(userId);
    if (!user) return new NotFoundError("User");

    const records: PositionRecordesType =
      await this.replacementLogRepo.getTeamRecordes(week.id, team.id);
    const score = await this.getScore(userId);
    if (score instanceof NotFoundError) return score;
    else return { records, user, score, week: week.weekNum };
  };

  getScore = async (userId: number): Promise<number | NotFoundErrorType> => {
    const team = await this.teamRepo.getTeamElevenByUserId(userId);
    if (!team) return new NotFoundError("Team");
    let scores = 0;
    team.players.map((player) => (scores += player.playerStats.score));
    return scores;
  };
}

export default VitrineService;
