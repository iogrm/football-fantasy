interface WeekRepositoryInterface {
  refreshWeeks: (datas: CreateWeekInputType[]) => Promise<WeekOutputType[]>;

  getCurrentWeek: () => Promise<WeekOutputType>;

  getNextWeek: () => Promise<WeekOutputType>;

  getPreviousWeek: () => Promise<WeekOutputType>;

  getWeekByNumber: (num: number) => Promise<WeekOutputType | NotFoundErrorType>;

  getWeekById: (id: number) => Promise<WeekOutputType | NotFoundErrorType>;

  getWeek: (key: WeekCondition) => Promise<WeekOutputType | NotFoundErrorType>;
}
