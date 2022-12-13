interface RecrutmentRepositoryInterface {
  createRecrutment: (
    teamId: number,
    playerId: number,
    positionNum: number,
    isPlaying: boolean
  ) => Promise<RecrutmentOutputType>;

  reomveRecrutment: (teamId: number, positionNum: number) => Promise<number>;

  replaceRecrutment: (
    teamId: number,
    playerId: number,
    positionNum: number,
    isPlaying: boolean
  ) => Promise<RecrutmentOutputType>;
}
