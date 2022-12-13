interface WeekRepositoryInterface {
  refreshWeeks: (datas: CreateWeekInputType[]) => Promise<WeekOutputType[]>;

  getCurrentWeek: () => Promise<WeekOutputType>;

  getNextWeek: () => Promise<WeekOutputType>;

  getPreviousWeek: () => Promise<WeekOutputType>;

  getWeekByNumber: (weekNum: number) => Promise<WeekOutputType>;

  getWeekById: (id: number) => Promise<WeekOutputType>;
}
