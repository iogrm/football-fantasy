import BatchService from "./batch.service";

export const batchInit = (
  weekService: WeekServiceInterface,
  playerService: PlayerServiceInterface
): BatchService => {
  const batchService = new BatchService(weekService, playerService);
  return batchService;
};
