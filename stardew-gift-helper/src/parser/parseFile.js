import { getSocialPoints } from "./socialPoints";
import { getPlayer, getPlayerItems } from "./player";
import { getAllChests, getChestsItems } from "./chests";
import { getGameLocations } from "./locations";

var convert = require("xml-js");

/**
 * Returns:
 *  - all user items (inventory + chests)
 *  - map of NPC to social level
 *
 * @param {*} fileContent
 */
export const parseGameFileContent = (fileContent) => {
  const converted = convert.xml2js(fileContent, {
    compact: true,
    ignoreComment: true,
    alwaysChildren: true,
  });

  const allItems = getAllItems(converted);
  const socialPoints = getSocialPoints(converted);

  return {
    items: allItems,
    socialPoints: socialPoints,
  };
};

const getAllItems = (content) => {
  const locations = getGameLocations(content);
  const chests = getAllChests(locations);
  const chestsItems = getChestsItems(chests);

  const player = getPlayer(content);
  const playerItems = getPlayerItems(player);

  return mergeAllMaps([chestsItems, playerItems]);
};

const mergeAllMaps = (maps) => {
  const finalMap = new Map();
  for (const map of maps) {
    for (const item in map) {
      if (!finalMap[item]) {
        finalMap[item] = map[item];
      } else {
        finalMap[item] += map[item];
      }
    }
  }
  return finalMap;
};
