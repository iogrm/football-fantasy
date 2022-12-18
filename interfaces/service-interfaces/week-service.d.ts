interface WeekServiceInterface {
  getWeek: (
    condition: WeekCondition
  ) => Promise<WeekOutputType | NotFoundErrorType>;
  refreshWeeks: (datas: CreateWeekInputType[]) => Promise<WeekOutputType[]>;
  getWeekByNumber: (
    weekNum: number
  ) => Promise<WeekOutputType | NotFoundErrorType>;
  getWeekById: (id: number) => Promise<WeekOutputType | NotFoundErrorType>;
}
