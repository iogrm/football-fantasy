declare type CreateWeekInputType = {
  id: number;
  number: number;
  endDate: Date;
  deadlineDate: Date;
  isCurrent: boolean;
  isNext: boolean;
  isPrevious: boolean;
};

declare type WeekOutputType = {
  id: number;
  number: number;
  endDate: Date;
  deadlineDate: Date;
  isCurrent: boolean;
  isNext: boolean;
  isPrevious: boolean;
};

type WeekCondition =
  | 'current'
  | 'next'
  | 'previous'
  | { id: number }
  | { number: number };
