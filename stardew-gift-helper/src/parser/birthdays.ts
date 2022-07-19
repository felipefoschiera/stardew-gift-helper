import { GameDay, Season, ValueIndexer } from "../types";
import { Villagers } from "../villagers";

export const getNPCBirthdays = (): ValueIndexer<Villagers, GameDay> => {
  return {
    Alex: {
      season: Season.Summer,
      day: 13,
    },
    Elliott: {
      season: Season.Fall,
      day: 5,
    },
    George: {
      season: Season.Fall,
      day: 24,
    },
  };
};
