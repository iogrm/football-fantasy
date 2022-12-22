import { BadRequestError } from "../../../error/bad-request-error";
import { NotFoundError } from "../../../error/not-found-error";

class WeekRepository implements WeekRepositoryInterface {
  constructor(private WeekModel: WeekModelType) {}

  refreshWeeks = async (datas: CreateWeekInputType[]) => {
    await this.WeekModel.update({ isCurrent: false }, { where: {} });
    return await Promise.all(
      datas.map(async (data) => {
        let week = await this.WeekModel.findByPk(data.id);
        if (week)
          return (
            await (await week.update(data)).save()
          ).toJSON() as WeekOutputType;
        else
          return (await this.WeekModel.create(data)).toJSON() as WeekOutputType;
      })
    );
  };
  getCurrentWeek = async () => {
    return (
      ((
        await this.WeekModel.findOne({ where: { isCurrent: true } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getNextWeek = async (): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { isNext: true } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getPreviousWeek = async (): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { isPrevious: true } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getWeek = async (
    key: WeekCondition
  ): Promise<WeekOutputType | NotFoundErrorType | BadRequestError> => {
    let condition: any = { isCurrent: false, isNext: false, isPrevious: false };
    switch (key) {
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
        break;
    }
    const week = await this.WeekModel.findOne({ where: condition });

    if (!week) return new NotFoundError("Week");
    return week;
  };

  getWeekBy = async (dep: {
    key: string;
    value: number;
  }): Promise<WeekOutputType | BadRequestError> => {
    if (dep.key !== ("number" || "id")) {
      return new BadRequestError("Week");
    }
    return (
      ((
        await this.WeekModel.findOne({ where: { [dep.key]: dep.value } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getWeekByNumber = async (number: number): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { number } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getWeekById = async (id: number): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { id } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };
}

export default WeekRepository;
