interface RefreshServiceInterface {
  refreshPremierLeagueDatas: () => void;
  refreshDB: (freshDatas: refreshDBInputType) => void;
}
