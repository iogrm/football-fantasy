type RecrutedPlayerOutputType = PlayerOutputType & {
  positionNum: number;
  isPlaying: boolean;
};

type TeamOutputType = {
  id: number;
  userId: number;
  name: string;
  credit: number;
  players: RecrutedPlayerOutputType[];
};
