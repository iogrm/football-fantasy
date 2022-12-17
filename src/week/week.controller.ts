import { RequestHandler } from "express";
import { handleError } from "../errors/error-hendler";

export class WeekController implements WeekControllerInterface {
  constructor(private weekService: WeekServiceInterface) {}

  getWeek: RequestHandler = async (req, res, next) => {
    try {
      const week = await this.weekService.getCurrentWeek();

      return res.status(200).json({ week: week });
    } catch (err) {
      handleError(err);
    }
  };
}
