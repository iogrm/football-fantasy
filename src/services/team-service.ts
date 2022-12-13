import { BadRequestError } from "../errors/bad-request-error";
import { HttpError } from "../errors/http-error";
import { NotFoundError } from "../errors/not-found-error";
import { xor } from "../utils/operates";

const MAX_CREDIT = 1000;

class TeamService implements TeamServiceInterface {
  constructor(
    private recrutmentRepo: RecrutmentRepositoryInterface,
    private playerRepo: PlayerRepositoryInterface,
    private teamRepo: TeamRepositoryInterface,
    private replacementLogRepo: ReplacementLogRepositoryInterface,
    private weekRepo: WeekRepositoryInterface
  ) {}

  getTeamByUserId = async (userId: number): Promise<TeamOutputType | null> => {
    return await this.teamRepo.getTeamByUserId(userId);
  };

  removePlayer = async (
    userId: number,
    positionNum: number
  ): Promise<
    TeamOutputType | null | NotFoundErrorType | BadRequestErrorType
  > => {
    const team = await this.teamRepo.getTeamByUserId(userId);
    if (!team) return new NotFoundError("Team");

    const player = team.players.find((p) => {
      return p.positionNum === positionNum;
    });

    if (!player) return new NotFoundError("Player");

    if (team.credit + player.playerStats.price > MAX_CREDIT)
      return new BadRequestError("LowCredit");

    await this.teamRepo.incrementTeamCredit(team.id, player.playerStats.price);
    await this.recrutmentRepo.reomveRecrutment(team.id, positionNum);

    return await this.teamRepo.getTeamById(team.id);
  };

  addPlayer = async (
    userId: number,
    playerId: number,
    positionNum: number
  ): Promise<
    TeamOutputType | null | NotFoundErrorType | BadRequestErrorType
  > => {
    const player = await this.playerRepo.getPlayerById(playerId);
    const team = await this.teamRepo.getTeamByUserId(userId);

    if (!player) return new NotFoundError("Player");
    if (!team) return new NotFoundError("Team");

    const players = team.players;
    const playersSameId = players.find((p) => {
      return p.id === playerId;
    });
    if (playersSameId) return new BadRequestError("DuplicatePlayer");

    const playerSameClub = players.filter((p) => {
      return p.club === player.club;
    });

    const playerSamePosition = players.find((p) => {
      return p.positionNum === positionNum;
    });

    if (playerSameClub.length > 3)
      return new BadRequestError("MoreThanClubLimit");

    let playerSamePositionPrice = 0;
    if (playerSamePosition)
      playerSamePositionPrice = playerSamePosition.playerStats.price;

    const dif = player.playerStats.price - playerSamePositionPrice;

    if (dif > team.credit!) return new BadRequestError("LowCredit");

    if (positionNum <= 1 && player.role !== "Goalkeepers")
      return new BadRequestError("InvalidePosition");
    if (2 <= positionNum && positionNum <= 6 && player.role !== "Defenders")
      return new BadRequestError("InvalidePosition");
    if (7 <= positionNum && positionNum <= 11 && player.role !== "Midfielders")
      return new BadRequestError("InvalidePosition");
    if (12 <= positionNum && positionNum <= 14 && player.role !== "Forwards")
      return new BadRequestError("InvalidePosition");

    await this.teamRepo.incrementTeamCredit(team.id, -dif);
    const nimkat = [1, 6, 11, 14];
    const teamElv = [0, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13];
    await this.recrutmentRepo.replaceRecrutment(
      team.id,
      playerId,
      positionNum,
      !nimkat.includes(positionNum)
    );

    return await this.teamRepo.getTeamById(team.id);
  };

  swapPlayers = async (
    userId: number,
    position1: number,
    position2: number
  ): Promise<
    TeamOutputType | null | NotFoundErrorType | BadRequestErrorType
  > => {
    const team = await this.teamRepo.getTeamByUserId(userId);
    const week = await this.weekRepo.getCurrentWeek();

    if (!team) return new NotFoundError("Team");
    if (!week) return new NotFoundError("Week");
    const players = team.players;

    if (position1 === position2) return new BadRequestError("SamePosition");

    const playerPosition1 = players.find((p) => {
      return p.positionNum === position1;
    });
    if (!playerPosition1) return new NotFoundError("Player");

    const playerPosition2 = players.find((p) => {
      return p.positionNum === position2;
    });
    if (!playerPosition2) return new NotFoundError("Player");

    if (
      xor(
        playerPosition1.role === "Goalkeepers",
        playerPosition2.role === "Goalkeepers"
      )
    )
      return new BadRequestError("DifferentRole");
    if (playerPosition1.role === playerPosition2.role) {
      await this.recrutmentRepo.replaceRecrutment(
        team.id,
        playerPosition2.id,
        position1,
        playerPosition1.isPlaying
      );

      await this.recrutmentRepo.replaceRecrutment(
        team.id,
        playerPosition1.id,
        position2,
        playerPosition2.isPlaying
      );

      this.log(week.id, team.id, playerPosition1, playerPosition2);
    } else {
      if (!xor(playerPosition1.isPlaying, playerPosition2.isPlaying))
        return new BadRequestError("SameIsPlaying");

      await this.recrutmentRepo.replaceRecrutment(
        team.id,
        playerPosition2.id,
        position2,
        playerPosition1.isPlaying
      );

      await this.recrutmentRepo.replaceRecrutment(
        team.id,
        playerPosition1.id,
        position1,
        playerPosition2.isPlaying
      );
      this.log(week.id, team.id, playerPosition1, playerPosition2);
    }

    return await this.teamRepo.getTeamByUserId(userId);
  };

  log = async (
    weekId: number,
    teamId: number,
    player1: RecrutedPlayerOutputType,
    player2: RecrutedPlayerOutputType
  ) => {
    if (player1.isPlaying === true && player2.isPlaying === false)
      await this.replacementLogRepo.recordLog({
        weekId,
        teamId,
        oldPlayerId: player2.id,
        newPlayerId: player1.id,
        position: player1.positionNum,
      });
    else if (player1.isPlaying === false && player2.isPlaying === true)
      await this.replacementLogRepo.recordLog({
        weekId,
        teamId,
        oldPlayerId: player1.id,
        newPlayerId: player2.id,
        position: player2.positionNum,
      });
    else console.log("these are same and we have no log");
  };
}

export default TeamService;
