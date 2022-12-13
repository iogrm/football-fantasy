interface TeamRepositoryInterface {
  getTeamById: (id: number) => Promise<TeamOutputType | null>;

  getTeamByUserId: (userId: number) => Promise<TeamOutputType | null>;

  getTeamElevenById: (id: number) => Promise<TeamOutputType | null>;

  getTeamElevenByUserId: (userId: number) => Promise<TeamOutputType | null>;

  incrementTeamCredit: (teamId: number, value: number) => Promise<boolean>;
}
