import { DataSource } from "typeorm";
import { string } from "zod";
import { BadRequestError } from "../../../error/bad-request-error";
import { NotFoundError } from "../../../error/not-found-error";
import { Week } from "../entity/Week";

class WeekRepository implements WeekRepositoryInterface {
  constructor(private dataSource: DataSource) {}

  getWeek = async (
    filter: WeekCondition
  ): Promise<WeekOutputType | NotFoundErrorType | null> => {
    const condition = { isCurrent: false, isNext: false, isPrevious: false };
    switch (filter) {
      case "current":
        condition.isCurrent = true;
        break;
      case "next":
        condition.isNext = true;
        break;
      case "previous":
        condition.isPrevious = true;
        break;
      default:
        return new BadRequestError("Week");
    }

    const week = await this.dataSource
      .createQueryBuilder()
      .select("week")
      .from(Week, "week")
      .where(condition)
      .getOne();

    if (!week) return new NotFoundError("Week");
    return week;
  };

  getWeekByKia = async (
    key: "id" | "number",
    value: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    const week = await this.dataSource
      .createQueryBuilder()
      .select("week")
      .from(Week, "week")
      .where(`week.${key} = :${key}`, { [key]: value })
      .getOne();
    if (!week) return new NotFoundError("Week");
    return week;
  };

  getWeekByNumber = async (
    number: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    const week: WeekOutputType | null = await this.dataSource
      .createQueryBuilder()
      .select("week")
      .from(Week, "week")
      .where("week.number = :number", { number })
      .getOne();
    if (!week) return new NotFoundError("Week");
    return week;
  };

  getWeekById = async (
    id: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    const week = await this.dataSource
      .createQueryBuilder()
      .select("week")
      .from(Week, "week")
      .where("week.id = :id", { id })
      .getOne();
    if (!week) return new NotFoundError("Week");
    return week;
  };
}

export default WeekRepository;
