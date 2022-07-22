import { PartialValueIndexer } from "./valueIndexer";

export enum Season {
  Spring,
  Summer,
  Fall,
  Winter,
}

const seasonIndexer: PartialValueIndexer<string, Season> = {
  ["spring"]: Season.Spring,
  ["summer"]: Season.Summer,
  ["fall"]: Season.Fall,
  ["winter"]: Season.Winter,
};

export const getSeasonFromString = (text: string): Season => {
  if (text == "spring") return Season.Spring;
  if (text == "summer") return Season.Summer;
  if (text == "fall") return Season.Fall;
  return Season.Winter;
};
