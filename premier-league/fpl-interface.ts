export interface ElementType {
  id: number;
  plural_name: string;
  plural_name_short: string;
  element_type: number;
}

export interface Team {
  code: number;
  id: number;
  name: string;
  short_name: string;
}

export interface Bootstrap {
  events: Array<Event>;
  game_settings: Object;
  phases: Array<any>;
  teams: Array<Team>;
  total_players: number;
  elements: Array<Element>;
  element_stats: Array<any>;
  element_types: Array<ElementType>;
}

export interface Element {
  code: number;
  first_name: string;
  second_name: string;
  web_name: string;
  now_cost: number;
  team: number;
  team_code: number;
  photo: string;
  element_type: number;
  total_points: number;
}

export interface Event {
  id: number;
  name: string;
  deadline_time: string;
  finished: boolean;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
}
