import { Villagers } from "../villagers";
import { getPlayer } from "./player";

export const getSocialPoints = (content) => {
  const player = getPlayer(content);
  const friendshipLevels = getFriendships(player);
  for (const npc of Object.keys(Villagers)) {
    if (!(npc in friendshipLevels)) {
      friendshipLevels[npc] = {
        name: npc,
        points: 0,
      };
    }
  }
  return Object.values(friendshipLevels);
};

const getFriendships = (player) => {
  const levels = {};
  const data = player["friendshipData"]["item"];
  for (const npc of data) {
    const name = npc["key"]["string"]["_text"];
    const points = parseInt(npc["value"]["Friendship"]["Points"]["_text"]);
    levels[name] = {
      name: name,
      points: points,
    };
  }
  return levels;
};
