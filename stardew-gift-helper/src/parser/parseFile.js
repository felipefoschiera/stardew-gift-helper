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

  const locations = getGameLocations(converted);
  const chests = getAllChests(locations);
  const chestsItems = getChestsItems(chests);

  const player = getPlayer(converted);
  const playerItems = getPlayerItems(player);

  const allItems = mergeAllMaps([chestsItems, playerItems]);

  return {
    items: allItems,
  };
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

const getPlayer = (content) => {
  return content["SaveGame"]["player"];
};

const getPlayerItems = (player) => {
  const itemsMap = new Map();
  const items = player["items"]["Item"];
  for (const item of items) {
    if (item["Name"] === undefined) continue;
    const name = item["Name"]["_text"];
    const quantity = parseInt(item["Stack"]["_text"]);
    if (!itemsMap[name]) {
      itemsMap[name] = quantity;
    } else {
      itemsMap[name] += quantity;
    }
  }
  return itemsMap;
};

const getGameLocations = (content) => {
  return content["SaveGame"]["locations"]["GameLocation"];
};

const getAllChests = (locations) => {
  let allChests = [];
  for (const gameLocation of locations) {
    const objects = getLocationObjects(gameLocation);
    const chests = getLocationChests(objects);
    allChests = allChests.concat(chests);
  }
  return allChests;
};

const getChestsItems = (chests) => {
  const itemsMap = new Map();
  for (const chest of chests) {
    const items = getChestItems(chest);
    for (const item of items) {
      const name = item["Name"]["_text"];
      const quantity = parseInt(item["Stack"]["_text"]);
      if (!itemsMap[name]) {
        itemsMap[name] = quantity;
      } else {
        itemsMap[name] += quantity;
      }
    }
  }
  return itemsMap;
};

const getChestItems = (chest) => {
  const items = chest["value"]["Object"]["items"]["Item"];
  if (Array.isArray(items)) {
    return items;
  }
  if (items === undefined) {
    return [];
  }
  return [items];
};

const getLocationObjects = (location) => {
  return location["objects"]["item"];
};

const getLocationChests = (objects) => {
  if (objects === undefined) return [];
  let chests = [];
  for (const object of objects) {
    if (object !== undefined) {
      if (objectIsChest(object)) {
        chests.push(object);
      }
    }
  }
  return chests;
};

const objectIsChest = (object) => {
  return object["value"]["Object"]["Name"]["_text"] == "Chest";
};
