import { getPlayer } from "./player";

export const getSocialPoints = (content) => {
  const player = getPlayer(content);
  return getFriendships(player);
};

const getFriendships = (player) => {
  const levels = [];
  const data = player["friendshipData"]["item"];
  for (const npc of data) {
    const name = npc["key"]["string"]["_text"];
    const points = parseInt(npc["value"]["Friendship"]["Points"]["_text"]);
    levels.push({
      name: name,
      points: points,
    });
  }
  return levels;
};
