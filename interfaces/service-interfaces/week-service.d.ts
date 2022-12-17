interface WeekServiceInterface {
  getCurrentWeek: () => Promise<WeekOutputType>;
  refreshWeeks: (datas: CreateWeekInputType[]) => Promise<WeekOutputType[]>;
  getWeekByNumber: (weekNum: number) => Promise<WeekOutputType>;
  getWeekById: (id: number) => Promise<WeekOutputType>;
}
