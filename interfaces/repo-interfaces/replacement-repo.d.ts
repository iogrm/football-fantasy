interface ReplacementRepositoryInterface {
  recordLog: (replacementLog: replacementType) => Promise<replacementType>;

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
