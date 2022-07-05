export const getGameLocations = (content) => {
  return content["SaveGame"]["locations"]["GameLocation"];
};

export const getLocationObjects = (location) => {
  return location["objects"]["item"];
};
