import { GameDay, getSeasonFromString } from "../types";

export const getCurrentGameDay = (content: any): GameDay => {
  return {
    season: getSeasonFromString(content["SaveGame"]["currentSeason"]["_text"]),
    day: parseInt(content["SaveGame"]["dayOfMonth"]["_text"]),
  };
};
