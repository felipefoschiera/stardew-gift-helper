import { giftPreferences } from "./favorites";

export const getFavoriteGifts = (villager) => {
  const villagerPreferences = giftPreferences[villager];
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
