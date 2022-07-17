export const getGameLocations = (content) => {
  return content["SaveGame"]["locations"]["GameLocation"];
};

export const getLocationObjects = (location) => {
  const objects = location["objects"]["item"];
  if (Array.isArray(objects)) return objects;
  if (objects === undefined) return [];
  return [objects];
};
