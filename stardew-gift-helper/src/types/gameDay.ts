import { Season } from "./season";

export interface GameDay {
  readonly season: Season;
  readonly day: number;
}
