// import { Repository } from 'typeorm';
// import { Week } from "../typeorm/entity/Week";
import { BadRequestError } from "../../error/bad-request-error";
import { NotFoundError } from "../../error/not-found-error";

class WeekService implements WeekServiceInterface {
  constructor(private weekRepo: WeekRepositoryInterface) {}

  getWeek = async (
    filter: WeekCondition
  ): Promise<WeekOutputType | NotFoundErrorType | BadRequestError> => {
    const week = this.weekRepo.getWeek(filter);
    if (!week) return new NotFoundError("Week");
    return week;
  };

  refreshWeeks = async (freshWeeks: CreateWeekInputType[]) => {
    return this.weekRepo.refreshWeeks(freshWeeks);
  };

  getWeekByNumber = async (
    number: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    return this.weekRepo.getWeekByNumber(number);
  };

  getWeekById = async (
    id: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    return this.weekRepo.getWeekById(id);
  };
}

export default WeekService;
