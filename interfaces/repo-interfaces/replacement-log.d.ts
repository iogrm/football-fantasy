interface ReplacementLogRepositoryInterface {
  recordLog: (
    replacementLog: replacementLogType
  ) => Promise<replacementLogType>;

  getPositionRecordes: (
    weekId: number,
    teamId: number,
    position: number
  ) => Promise<PositionRecordesType>;

  getTeamRecordes: (
    weekId: number,
    teamId: number
  ) => Promise<PositionRecordesType>;
}
