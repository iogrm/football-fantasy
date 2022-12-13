import { fetchBootstrap } from "fpl-api";
import { fetchOurBootstrap } from "./fpl-utils";

let count = 0;

export const fetchFplFacade = async () => {
  count = 0;
  let data = await reiterativeFunc(fetchBootstrap, 10);
  if (!data) {
    data = await reiterativeFunc(fetchOurBootstrap, 10);
  }
  return data;
};

const reiterativeFunc = async (func: Function, repeat: number) => {
  let i = 1;
  while (i <= repeat) {
    try {
      const data = await func();
      return data;
    } catch (error) {
      console.log("--------------------------------------------");
      console.log(`try for ${count}th time`);
      console.log(`error in fetch bootstrap : ${func.name}`, error);
      i++;
      count++;
    }
  }
  return false;
};
