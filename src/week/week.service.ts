class WeekService implements WeekServiceInterface {
  constructor(private weekRepo: WeekRepositoryInterface) {}

  getCurrentWeek = async () => {
    return this.weekRepo.getCurrentWeek();
  };

  refreshWeeks = async (freshWeeks: CreateWeekInputType[]) => {
    return this.weekRepo.refreshWeeks(freshWeeks);
  };

  getWeekByNumber = async (weekNum: number): Promise<WeekOutputType> => {
    return this.weekRepo.getWeekByNumber(weekNum);
  };

  getWeekById = async (id: number): Promise<WeekOutputType> => {
    return this.weekRepo.getWeekById(id);
  };
}

export default WeekService;
