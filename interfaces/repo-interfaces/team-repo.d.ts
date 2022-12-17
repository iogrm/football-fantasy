interface TeamRepositoryInterface {
  getTeamById: (id: number) => Promise<TeamOutputType | null>;

  getTeamByUserId: (userId: number) => Promise<TeamOutputType | null>;

  getFeildTeamById: (id: number) => Promise<TeamOutputType | null>;

  getFeildTeamByUserId: (userId: number) => Promise<TeamOutputType | null>;

  incrementTeamCredit: (teamId: number, value: number) => Promise<boolean>;
}
