import { CronJob } from "cron";

class BatchComponent implements BatchComponentInterface {
  constructor(private services: AllServisces) {}
  schedule = () => {
    this.configedCronJob(
      process.env.FPL_TIME!,
      this.services.refreshService.refreshPremierLeagueDatas
    );
  };

  doCronJob = (time: string, func: Function) => {
    func();
    this.configedCronJob(time, func);
  };

  configedCronJob = (time: string, func: Function) => {
    const cron = new CronJob(time, func(), null, true, "Asia/Tehran").start();
  };

  // something = async () => {
  //   this.services.refreshService.refreshPremierLeagueDatas();
  //   const currentWeek = await this.services.weekService.getCurrentWeek();
  //   const deadline = currentWeek.endDate;
  // };
}
export default BatchComponent;
