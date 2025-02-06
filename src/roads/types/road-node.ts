import { Road } from "../models/road";

export type RoadNode = {
  road?: Road;
  totalCongestionValue: number;
  next?: Road | null;
  isVisited?: boolean;
};
