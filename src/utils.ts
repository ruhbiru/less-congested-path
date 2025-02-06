import { Road } from "./roads/models/road";
import { RoadNode } from "./roads/types/road-node";
import { RoadDict } from "./roads/types/road-dict";
import { RoadGraph } from "./roads/types/road-graph";

export const initRoadDict = () => {
  const roads: RoadDict = {};

  const roadNe42ndWay = addNewRoad(roads, "NE 42nd Way");
  const roadNe42ndSt = addNewRoad(roads, "NE 42nd St");
  setAdjacentRoads(roadNe42ndWay, roadNe42ndSt);
  const road201stAveNE = addNewRoad(roads, "201st Ave NE");
  setAdjacentRoads(roadNe42ndSt, road201stAveNE);
  const roadNe44thSt = addNewRoad(roads, "NE 44th St");
  setAdjacentRoads(roadNe44thSt, road201stAveNE);
  const road202ndAveNE = addNewRoad(roads, "202nd Ave NE");
  setAdjacentRoads(roadNe42ndSt, road202ndAveNE);
  setAdjacentRoads(roadNe44thSt, road202ndAveNE);
  const roadNe39thSt = addNewRoad(roads, "NE 39th St");
  setAdjacentRoads(roadNe39thSt, roadNe42ndSt);
  const roadNe39thLn = addNewRoad(roads, "NE 39th Ln");
  setAdjacentRoads(roadNe39thLn, roadNe39thSt);
  const road203rdAveNe = addNewRoad(roads, "203rd Ave NE");
  setAdjacentRoads(road203rdAveNe, roadNe39thSt);
  setAdjacentRoads(road203rdAveNe, roadNe42ndSt);
  const road204thAveNe = addNewRoad(roads, "204th Ave NE");
  setAdjacentRoads(road204thAveNe, roadNe39thSt);
  setAdjacentRoads(road204thAveNe, road203rdAveNe);
  const road205thPiNe = addNewRoad(roads, "205th PI NE");
  setAdjacentRoads(road205thPiNe, road204thAveNe);
  const road206thPiNe = addNewRoad(roads, "206th PI NE");
  setAdjacentRoads(road206thPiNe, road204thAveNe);

  return roads;
};

const setAdjacentRoads = (road1: Road, road2: Road) => {
  road1.adjacentRoads.push(road2);
  road2.adjacentRoads.push(road1);
};

const addNewRoad = (roads: RoadDict, name: string) => {
  const road = new Road(name);
  roads[name] = road;
  return road;
};

/**
 * Search less congested path
 * Traverse the less congested path from the destination to the departure point.
 * Using Dijkstra's algorithm, calculate the congestion value for each road.
 * Keep track of the next path leading to the next RoadNode.
 */
export const getLessCongestedPath = (
  roads: RoadDict,
  departureRoad: Road,
  destinationRoad: Road
) => {
  const graph: RoadGraph = initRoadGraph(roads);

  let roadBeingVisited: RoadNode | null = graph[destinationRoad.name];
  roadBeingVisited.totalCongestionValue = 0;

  let totalUnvisitedRoads = Object.keys(roads).length;

  while (roadBeingVisited && totalUnvisitedRoads) {
    for (let adjacentRoad of roadBeingVisited.road!.adjacentRoads) {
      const adjacentRoadNode = graph[adjacentRoad.name];
      if (!adjacentRoadNode.isVisited) {
        const newTotalCongestionValue =
          roadBeingVisited.totalCongestionValue +
          adjacentRoad.getCongestionValue();

        if (adjacentRoadNode.totalCongestionValue > newTotalCongestionValue) {
          adjacentRoadNode.totalCongestionValue = newTotalCongestionValue;
          adjacentRoadNode.next = roadBeingVisited.road;
        }
      }
    }

    graph[roadBeingVisited.road!.name].isVisited = true;
    roadBeingVisited = getUnvisitedRoadWithLessCongestionValue(graph);

    totalUnvisitedRoads--;
  }

  return getPath(graph, departureRoad, destinationRoad.name);
};

const initRoadGraph = (roads: RoadDict) => {
  const graph: RoadGraph = {};
  const roadNames = Object.keys(roads);

  for (let roadName of roadNames) {
    graph[roadName] = {
      road: roads[roadName],
      totalCongestionValue: Infinity,
      next: null,
      isVisited: false,
    };
  }
  return graph;
};

const getUnvisitedRoadWithLessCongestionValue = (graph: RoadGraph) => {
  let roadWithLessCongestionValue: RoadNode = {
    totalCongestionValue: Infinity,
  };

  for (let road of Object.values(graph)) {
    if (
      !road.isVisited &&
      roadWithLessCongestionValue.totalCongestionValue >
        road.totalCongestionValue
    ) {
      roadWithLessCongestionValue = road;
    }
  }

  return roadWithLessCongestionValue.road ? roadWithLessCongestionValue : null;
};

const getPath = (
  graph: RoadGraph,
  departureRoad: Road,
  destinationRoadName: string
) => {
  let currentRoad: RoadNode | null = graph[departureRoad.name];
  const path = [];

  do {
    path.push(currentRoad.road!.name);
    currentRoad = graph[currentRoad.next!.name];
  } while (currentRoad.road!.name !== destinationRoadName);

  path.push(destinationRoadName);
  return path;
};
