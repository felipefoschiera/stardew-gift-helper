import {
  getBuildingIndoorChests,
  getLocationBuildings,
  getLocationObjects,
} from "./locations";

export const getAllChests = (locations) => {
  const locationChests = getChestsFromLocations(locations);
  const buildingChests = getChestsFromBuildings(locations);
  return [...locationChests, ...buildingChests];
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

const getChestsFromLocations = (locations) => {
  let locationChests = [];
  for (const gameLocation of locations) {
    const objects = getLocationObjects(gameLocation);
    const chests = getLocationChests(objects);
    locationChests = locationChests.concat(chests);
  }
  return locationChests;
};

const getChestsFromBuildings = (locations) => {
  let buildingChests = [];
  for (const gameLocation of locations) {
    const buildings = getLocationBuildings(gameLocation);
    const chests = getBuildingIndoorChests(buildings);
    buildingChests = buildingChests.concat(chests);
  }
  return buildingChests;
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
