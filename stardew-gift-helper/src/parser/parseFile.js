import { getSocialPoints } from "./socialPoints";
import { getNPCBirthdays } from "./birthdays";
import { getCurrentGameDay } from "./gameDay";

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

  const allItems = getEveryItem(converted);
  const socialPoints = getSocialPoints(converted);
  socialPoints.sort((a, b) => b.points - a.points);

  const npcBirthdays = getNPCBirthdays();
  const currentDay = getCurrentGameDay(converted);
  return {
    items: allItems,
    socialPoints: socialPoints,
    npcBirthdays: npcBirthdays,
    currentGameDay: currentDay,
  };
};

const getEveryItem = (content) => {
  const gameSave = content["SaveGame"];

  const items = recursiveGetItems("", gameSave, 0);
  const allItems = new Map();
  for (const item of items) {
    const { name, quantity } = item;
    if (!allItems[name]) {
      allItems[name] = quantity;
    } else {
      allItems[name] += quantity;
    }
  }
  return allItems;
};

const recursiveGetItems = (key, object, ctr) => {
  if (object === undefined) return [];
  if (object["Stack"] !== undefined && object["Name"]["_text"] !== "Chest") {
    return [
      {
        name: object["Name"]["_text"],
        quantity: parseInt(object["Stack"]["_text"]),
      },
    ];
  }
  let items = [];
  for (const key of Object.keys(object)) {
    if (typeof object === "object") {
      const childItems = recursiveGetItems(key, object[key], ctr + 1);
      items = items.concat(...childItems);
    }
  }
  return items;
};
