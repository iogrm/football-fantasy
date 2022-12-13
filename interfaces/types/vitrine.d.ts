type vitrineType = {
  records: PositionRecordesType;
  user: UserOutputType;
  score: number;
  week: number;
};

type vitrineplusType = {
  records: PositionRecordesType;
  user: UserOutputType;
  score: number;
  week: number;
  isLike: boolean;
};

type followingVitrinesType = Array<vitrineplusType>;
