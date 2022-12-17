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

  getWeekByNumber = async (weekNum: number): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { weekNum: weekNum } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };

  getWeekById = async (id: number): Promise<WeekOutputType> => {
    return (
      ((
        await this.WeekModel.findOne({ where: { id: id } })
      )?.toJSON() as WeekOutputType) ?? null
    );
  };
}

export default WeekRepository;
