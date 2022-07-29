import { getSocialPoints } from "./socialPoints";
import { getNPCBirthdays } from "./birthdays";
import { getCurrentGameDay } from "./gameDay";
import convert from "xml-js";

export const parseGameFileContent = (fileContent: string) => {
  const converted = convert.xml2js(fileContent, {
    compact: true,
    ignoreComment: true,
    alwaysChildren: true,
  });

  const allItems = getEveryItem(converted);
  console.log(allItems.size);
  const socialPoints = getSocialPoints(converted);

  const npcBirthdays = getNPCBirthdays();
  const currentDay = getCurrentGameDay(converted);
  return {
    items: allItems,
    socialPoints: socialPoints,
    npcBirthdays: npcBirthdays,
    currentGameDay: currentDay,
  };
};

const getEveryItem = (content: any): Map<string, number> => {
  return recursiveGetItems(content["SaveGame"]).reduce(
    (res, { name, quantity }) => {
      const count = res.get(name) ? res.get(name) + quantity : quantity;
      return res.set(name, count);
    },
    new Map()
  );
};

const recursiveGetItems = (object: any): ReadonlyArray<FileItem> => {
  if (!isObject(object)) return [];
  if (hasStack(object) && isNotChest(object) && isEligible(object)) {
    return getSingleItemFromObject(object);
  }
  return Object.values(object).flatMap((childObject) =>
    recursiveGetItems(childObject)
  );
};

const isObject = (object: any): boolean => {
  return object !== undefined && typeof object == "object";
};

const hasStack = (object: any): boolean => {
  return object["Stack"] !== undefined;
};

const isNotChest = (object: any): boolean => {
  return object["Name"]["_text"] !== "Chest";
};

const isEligible = (object: any): boolean => {
  if (object["hasBeenInInventory"] !== undefined) {
    return object["hasBeenInInventory"]["_text"] == "true";
  }
  return false;
};

const getSingleItemFromObject = (object: any): ReadonlyArray<FileItem> => {
  return [
    {
      name: object["Name"]["_text"],
      quantity: parseInt(object["Stack"]["_text"]),
    },
  ];
};

interface FileItem {
  readonly name: string;
  readonly quantity: number;
}
