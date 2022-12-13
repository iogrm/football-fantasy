class WeekService implements WeekServiceInterface {
  constructor(private weekRepo: WeekRepositoryInterface) {}

  getCurrentWeek = async () => {
    return this.weekRepo.getCurrentWeek();
  };
}

export default WeekService;
