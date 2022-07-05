import { getPlayer } from "./player";

export const getSocialPoints = (content) => {
  const player = getPlayer(content);
  return getFriendships(player);
};

const getFriendships = (player) => {
  const levelMap = new Map();
  const data = player["friendshipData"]["item"];
  for (const npc of data) {
    const name = npc["key"]["string"]["_text"];
    const level = parseInt(npc["value"]["Friendship"]["Points"]["_text"]);
    levelMap[name] = level;
  }
  return levelMap;
};
