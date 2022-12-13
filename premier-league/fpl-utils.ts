import axios from "axios";
import { Bootstrap } from "./fpl-interface";

export const fetchOurBootstrap = async () => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    if (!response) {
      return undefined;
    } else {
      let data: Bootstrap = response as unknown as Bootstrap;
      return data;
    }
  } catch (error) {
    console.log("error in ourFetchBootstrap in fetch-bootstrap.ts :", error);
  }
};
