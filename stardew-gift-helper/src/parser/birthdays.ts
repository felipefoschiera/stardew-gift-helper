import { GameDay, Season, ValueIndexer } from "../types";
import { Villagers } from "../villagers";

export const getNPCBirthdays = (): ValueIndexer<Villagers, GameDay> => {
  return {
    Abigail: {
      season: Season.Fall,
      day: 13,
    },
    Alex: {
      season: Season.Summer,
      day: 13,
    },
    Caroline: {
      season: Season.Winter,
      day: 7,
    },
    Clint: {
      season: Season.Winter,
      day: 26,
    },
    Demetrius: {
      season: Season.Summer,
      day: 19,
    },
    Dwarf: {
      season: Season.Summer,
      day: 22,
    },
    Elliott: {
      season: Season.Fall,
      day: 5,
    },
    Emily: {
      season: Season.Spring,
      day: 27,
    },
    Evelyn: {
      season: Season.Winter,
      day: 20,
    },
    George: {
      season: Season.Fall,
      day: 24,
    },
    Gus: {
      season: Season.Summer,
      day: 8,
    },
    Haley: {
      season: Season.Spring,
      day: 14,
    },
    Harvey: {
      season: Season.Winter,
      day: 14,
    },
    Jas: {
      season: Season.Summer,
      day: 4,
    },
    Jodi: {
      season: Season.Fall,
      day: 11,
    },
    Leah: {
      season: Season.Winter,
      day: 23,
    },
    Lewis: {
      season: Season.Spring,
      day: 7,
    },
    Linus: {
      season: Season.Winter,
      day: 3,
    },
    Marnie: {
      season: Season.Fall,
      day: 18,
    },
    Maru: {
      season: Season.Summer,
      day: 10,
    },
    Pam: {
      season: Season.Spring,
      day: 18,
    },
    Penny: {
      season: Season.Fall,
      day: 2,
    },
    Pierre: {
      season: Season.Spring,
      day: 26,
    },
    Robin: {
      season: Season.Fall,
      day: 21,
    },
    Sam: {
      season: Season.Summer,
      day: 17,
    },
    Sebastian: {
      season: Season.Winter,
      day: 10,
    },
    Shane: {
      season: Season.Spring,
      day: 20,
    },
    Vincent: {
      season: Season.Spring,
      day: 10,
    },
    Willy: {
      season: Season.Summer,
      day: 24,
    },
    Wizard: {
      season: Season.Winter,
      day: 17,
    },
    Sandy: {
      season: Season.Fall,
      day: 15,
    },
    Kent: {
      season: Season.Spring,
      day: 4,
    },
    Krobus: {
      season: Season.Winter,
      day: 1,
    },
    Leo: {
      season: Season.Summer,
      day: 26,
    },
  };
};
