import { getLocationObjects } from "./locations";

export const getAllChests = (locations) => {
  let allChests = [];
  for (const gameLocation of locations) {
    const objects = getLocationObjects(gameLocation);
    console.log("got objects", objects);
    const chests = getLocationChests(objects);
    allChests = allChests.concat(chests);
  }
  return allChests;
};

export const getChestsItems = (chests) => {
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
  return object["value"]["Object"]["Name"]["_text"] === "Chest";
};
