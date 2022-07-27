import { Villagers } from "../villagers";

export const getSocialPoints = (content: any) => {
  const player = getPlayer(content);
  const friendshipLevels = getFriendships(player);
  Object.keys(Villagers).forEach((npc) => {
    if (!friendshipLevels.has(npc)) {
      friendshipLevels.set(npc, 0);
    }
  });
  const socialPoints = Array.from(friendshipLevels, ([name, points]) => ({
    name,
    points,
  }));
  socialPoints.sort((a, b) => b.points - a.points);
  return socialPoints;
};

const getPlayer = (content: any) => {
  return content["SaveGame"]["player"];
};

const getFriendships = (player: any): Map<string, number> => {
  return getAllFriendshipInformation(player).reduce((res, { name, points }) => {
    return res.set(name, points);
  }, new Map());
};

const getAllFriendshipInformation = (
  player: any
): ReadonlyArray<FriendshipInformation> => {
  return getPlayerFriendshipData(player).flatMap((child: any) =>
    getFriendshipInformation(child)
  );
};

const getPlayerFriendshipData = (object: any): any => {
  return object["friendshipData"]["item"];
};

const getFriendshipInformation = (object: any): FriendshipInformation => {
  return {
    name: object["key"]["string"]["_text"],
    points: parseInt(object["value"]["Friendship"]["Points"]["_text"]),
  };
};

interface FriendshipInformation {
  readonly name: string;
  readonly points: number;
}
