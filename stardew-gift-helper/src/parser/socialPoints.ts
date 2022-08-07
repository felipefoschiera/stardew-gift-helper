import { Villagers } from "../villagers";

export const getSocialPoints = (content: any) => {
  const player = getPlayer(content);
  const friendshipData = getFriendships(player);
  Object.keys(Villagers).forEach((npc) => {
    if (!friendshipData.has(npc)) {
      friendshipData.set(npc, { name: npc, points: 0, giftsThisWeek: 0 });
    }
  });
  const socialPoints = Array.from(friendshipData.values());
  socialPoints.sort((a, b) => b.points - a.points);
  return socialPoints;
};

const getPlayer = (content: any) => {
  return content["SaveGame"]["player"];
};

const getFriendships = (player: any): Map<string, FriendshipInformation> => {
  return getAllFriendshipInformation(player).reduce((res, info) => {
    return res.set(info.name, info);
  }, new Map());
};

const getAllFriendshipInformation = (
  player: any
): ReadonlyArray<FriendshipInformation> => {
  let friendshipData = getPlayerFriendshipData(player).flatMap((child: any) =>
    getFriendshipInformation(child)
  );

  const villagerNames = Object.values(Villagers).map((villager) =>
    villager.toString()
  );
  friendshipData = friendshipData.filter((obj: FriendshipInformation) =>
    villagerNames.includes(obj.name)
  );
  return friendshipData;
};

const getPlayerFriendshipData = (object: any): any => {
  return object["friendshipData"]["item"];
};

const getFriendshipInformation = (object: any): FriendshipInformation => {
  return {
    name: object["key"]["string"]["_text"],
    points: parseInt(object["value"]["Friendship"]["Points"]["_text"]),
    giftsThisWeek: parseInt(
      object["value"]["Friendship"]["GiftsThisWeek"]["_text"]
    ),
  };
};

interface FriendshipInformation {
  readonly name: string;
  readonly points: number;
  readonly giftsThisWeek: number;
}
