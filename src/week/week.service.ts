import { Repository } from 'typeorm';
import { Week } from '../typeorm/entity/Week';
import { BadRequestError } from '../error/bad-request-error';
import { NotFoundError } from '../error/not-found-error';

class WeekService implements WeekServiceInterface {
  constructor(private weekRepo: Repository<Week>) {}

  getWeek = async (
    filter: WeekCondition
  ): Promise<WeekOutputType | NotFoundErrorType | BadRequestError> => {
    const condition = { isCurrent: false, isNext: false, isPrevious: false };
    switch (filter) {
      case 'current':
        condition.isCurrent = true;
        break;
      case 'next':
        condition.isNext = true;
        break;
      case 'previous':
        condition.isPrevious = true;
        break;
      default:
        return new BadRequestError('Week');
    }
    const week = await this.weekRepo.findOne({
      where: condition,
    });
    if (!week) return new NotFoundError('Week');
    return week;
  };

  refreshWeeks = async (freshWeeks: CreateWeekInputType[]) => {
    return this.weekRepo.refreshWeeks(freshWeeks);
  };

  getWeekByNumber = async (
    number: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    const week = await this.weekRepo.findOne({
      where: {
        number,
      },
    });
    if (!week) return new NotFoundError('Week');
    return week;
  };

  getWeekById = async (
    id: number
  ): Promise<WeekOutputType | NotFoundErrorType> => {
    const week = await this.weekRepo.findOne({
      where: {
        id,
      },
    });
    if (!week) return new NotFoundError('Week');
    return week;
  };
}

export default WeekService;
