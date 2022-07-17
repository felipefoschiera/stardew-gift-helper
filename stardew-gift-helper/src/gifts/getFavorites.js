import { Villagers } from "../villagers";
import { giftPreferences } from "./favorites";

export const getAllFavoriteGifts = () => {
  const favoriteGifts = {};
  Object.keys(Villagers).forEach((villager) => {
    favoriteGifts[villager] = getFavoriteGifts(villager);
  });
  return favoriteGifts;
};

const getFavoriteGifts = (villager) => {
  const villagerPreferences = giftPreferences[villager];
  if (villagerPreferences === undefined) {
    return {
      lovedGifts: [],
      likedGifts: [],
      neutralGifts: [],
    };
  }
  const lovedGifts = villagerPreferences.lovedGifts.filter((gift) => {
    return !villagerPreferences.lovedExceptions.includes(gift);
  });
  const likedGifts = villagerPreferences.likedGifts.filter((gift) => {
    return !villagerPreferences.likedExceptions.includes(gift);
  });
  const neutralGifts = villagerPreferences.neutralGifts.filter((gift) => {
    return !villagerPreferences.neutralExceptions.includes(gift);
  });

  return {
    lovedGifts,
    likedGifts,
    neutralGifts,
  };
};
