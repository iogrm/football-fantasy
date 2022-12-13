import { Element, ElementType, Team, Event } from "./fpl-interface";

export const weeksDto = (weeks: Array<Event>) => {
  const weeksRepo = weeks.map((w) => {
    const { id, deadline_time, is_current, is_next, is_previous } = w;

    const endDate = new Date(deadline_time);
    const deadlineDate = new Date(deadline_time);

    endDate.setHours(endDate.getHours() + 24);

    const week: CreateWeekInputType = {
      id: id,
      weekNum: id,
      endDate: endDate,
      deadlineDate: deadlineDate,
      isCurrent: is_current,
      isNext: is_next,
      isPrevious: is_previous,
    };
    return week;
  });
  return weeksRepo;
};

export const playersDto = (
  weeks: Array<Event>,
  players: Array<Element>,
  roles: Array<ElementType>,
  teams: Array<Team>
) => {
  const week = weeks.find((week) => week.is_current === true);
  const weekId = week!.id;

  const playersRepo = players.map((p) => {
    const {
      code,
      first_name,
      second_name,
      now_cost,
      team_code,
      element_type,
      total_points,
      web_name,
    } = p;

    const role = roles.find((role) => {
      return role.id === element_type;
    });

    const team = teams.find((team) => {
      return team.code === team_code;
    });

    let player: CreatePlayerInputType = {
      id: code,
      firstName: first_name,
      secondName: second_name,
      club: team!.name,
      webname: web_name,
      role: role!.plural_name as PlayerRolesType,
      playerStats: {
        price: now_cost,
        score: total_points,
        weekId: weekId,
      },
    };
    return player;
  });

  return playersRepo;
};
