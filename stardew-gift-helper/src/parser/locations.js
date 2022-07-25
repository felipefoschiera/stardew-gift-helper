export const getGameLocations = (content) => {
  return content["SaveGame"]["locations"]["GameLocation"];
};

export const getLocationObjects = (location) => {
  const objects = location["objects"]["item"];
  if (Array.isArray(objects)) return objects;
  if (objects === undefined) return [];
  return [objects];
};

export const getLocationBuildings = (location) => {
  const locationBuildings = location["buildings"];
  if (locationBuildings === undefined) return [];
  const buildings = locationBuildings["Building"];
  return buildings;
};

export const getBuildingIndoorChests = (buildings) => {
  let allChests = [];
  for (const building of buildings) {
    const indoors = building["indoors"];
    if (indoors == undefined) continue;
    const objects = indoors["objects"];
    if (objects == undefined || !("item" in objects)) continue;
    const chests = objects["item"].filter((obj) => objectIsChest(obj));
    allChests.push(...chests);
  }
  return allChests;
};

const objectIsChest = (object) => {
  return object["value"]["Object"]["Name"]["_text"] === "Chest";
};
