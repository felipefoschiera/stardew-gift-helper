export enum Season {
  Spring,
  Summer,
  Fall,
  Winter,
}

export const getSeasonFromString = (text: string): Season => {
  if (text == "spring") return Season.Spring;
  if (text == "summer") return Season.Summer;
  if (text == "fall") return Season.Fall;
  return Season.Winter;
};

export const getSeasonText = (season: Season): string => {
  if (season == Season.Spring) return "Spring";
  if (season == Season.Summer) return "Summer";
  if (season == Season.Fall) return "Fall";
  return "Winter";
};
