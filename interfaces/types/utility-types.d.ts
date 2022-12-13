type JwtPayloadType = { userId: number };

type GetPaginatedType = {
  page: number;
  num: number;
  order?: string;
  sortBy?: string;
};

type PaginatedOutputType<T> = {
  values: T[];
  count: number;
};
