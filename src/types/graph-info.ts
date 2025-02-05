import { Road } from "../models/road";

export type GraphInfo = {
  road?: Road;
  distance: number;
  next?: Road | null;
  isVisited?: boolean;
};
