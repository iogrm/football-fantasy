import { TimeoutError } from "../src/errors/network-error";
import { weeksDto, playersDto } from "./fpl-dto";
import { fetchFplFacade } from "./fpl-facade";

export const fetchPremireLeague = async (): Promise<
  TimeoutError | freshDBInputType
> => {
  const data = await fetchFplFacade();
  if (!data) return new TimeoutError();
  const players = playersDto(
    data.events,
    data.elements,
    data.element_types,
    data.teams
  );
  const weeks = weeksDto(data.events);
  return { weeks, players };
};
