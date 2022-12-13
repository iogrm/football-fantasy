declare type CreateWeekInputType = {
  id: number;
  weekNum: number;
  endDate: Date;
  deadlineDate: Date;
  isCurrent: boolean;
  isNext: boolean;
  isPrevious: boolean;
};

declare type WeekOutputType = {
  id: number;
  weekNum: number;
  endDate: Date;
  deadlineDate: Date;
  isCurrent: boolean;
  isNext: boolean;
  isPrevious: boolean;
};
