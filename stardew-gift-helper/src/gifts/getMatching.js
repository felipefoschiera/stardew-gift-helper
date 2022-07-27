export const getMatchingGifts = (items, villagerFavorites) => {
  const allMatching = {};
  for (const [villager, favorites] of Object.entries(villagerFavorites)) {
    allMatching[villager] = getMatchingItems(items, favorites);
  }
  return allMatching;
};

const getMatchingItems = (items, favorites) => {
  const { lovedGifts, likedGifts, neutralGifts } = favorites;
  return {
    lovedGifts: lovedGifts.filter((gift) => items.has(gift)),
    likedGifts: likedGifts.filter((gift) => items.has(gift)),
    neutralGifts: neutralGifts.filter((gift) => items.has(gift)),
  };
};
