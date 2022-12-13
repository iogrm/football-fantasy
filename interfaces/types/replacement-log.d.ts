type replacementLogType = {
  weekId: number;
  teamId: number;
  oldPlayerId: number;
  newPlayerId: number;
  position: number;
};

type PositionRecordesType = Array<replacementLogType>;
