export const getPlayer = (content) => {
  return content["SaveGame"]["player"];
};

export const getPlayerItems = (player) => {
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
