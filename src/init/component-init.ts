import BatchComponent from "../component/batch-component";

export const initComponents = (deps: AllServisces): AllComponents => ({
  batchComponent: new BatchComponent(deps),
});
