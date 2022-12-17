import { CronJob } from "cron";
import { fetchPremireLeague } from "../../premier-league/repo";
import { TimeoutError } from "../errors/network-error";
class BatchService implements BatchServiceInterface {
  constructor(
    private weekService: WeekServiceInterface,
    private playerService: PlayerServiceInterface
  ) {}
  schedule = () => {
    this.configedCronJob(process.env.FPL_TIME!, async () => {
      const data = await fetchPremireLeague();
      if (data instanceof TimeoutError) {
      } else {
        const { weeks, players } = data;
        console.log("data is came from fpl \n", players[0], weeks[0]);
        await this.weekService.refreshWeeks(weeks);
        await this.playerService.refreshPlayers(players);
      }
    });
  };

  doCronJob = (time: string, func: Function) => {
    func();
    this.configedCronJob(time, func);
  };

  configedCronJob = (time: string, func: Function) => {
    const cron = new CronJob(time, func(), null, true, "Asia/Tehran").start();
  };
}
export default BatchService;
