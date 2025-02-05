import { Road } from "./models/road";
import { GraphInfo } from "./types/graph-info";
import { RoadDict } from "./types/road-dict";
import { RoadGraph } from "./types/road-graph";

const setAdjacentRoads = (road1: Road, road2: Road) => {
  road1.adjacentRoads.push(road2);
  road2.adjacentRoads.push(road1);
};

const addNewRoad = (roads: RoadDict, name: string) => {
  const road = new Road(name);
  roads[name] = road;
  return road;
};

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

const initRoadGraph = (roads: RoadDict) => {
  const graph: RoadGraph = {};
  const roadNames = Object.keys(roads);

  for (let roadName of roadNames) {
    graph[roadName] = {
      road: roads[roadName],
      distance: Infinity,
      next: null,
      isVisited: false,
    };
  }
  return graph;
};

const getUnvisitedRoadWithMinDistance = (graph: RoadGraph) => {
  let lessDistance: GraphInfo = { distance: Infinity };
  for (let graphInfo of Object.values(graph)) {
    if (!graphInfo.isVisited && lessDistance.distance > graphInfo.distance) {
      lessDistance = graphInfo;
    }
  }

  return lessDistance.road ? lessDistance : null;
};

const getPath = (
  graph: RoadGraph,
  departureRoad: Road,
  destinationRoadName: string
) => {
  let currentGraphNodeInfo: GraphInfo | null = graph[departureRoad.name];
  const path = [];

  do {
    path.push(currentGraphNodeInfo.road!.name);
    currentGraphNodeInfo = graph[currentGraphNodeInfo.next!.name];
  } while (currentGraphNodeInfo.road!.name != destinationRoadName);

  path.push(destinationRoadName);
  return path;
};

export const getLessCongestedPath = (
  roads: RoadDict,
  departureRoad: Road,
  destinationRoad: Road
) => {
  const totalRoads = Object.keys(roads).length;
  const graph: RoadGraph = initRoadGraph(roads);

  let currentNode = destinationRoad;

  let totalVisitedRoads = 0;
  let currentGraphNodeInfo: GraphInfo = graph[currentNode.name];
  currentGraphNodeInfo.distance = 0;

  while (totalVisitedRoads < totalRoads) {
    for (let adjacentRoad of currentNode.adjacentRoads) {
      const adjacentRoadInfo = graph[adjacentRoad.name];
      if (!adjacentRoadInfo.isVisited) {
        const distance =
          currentGraphNodeInfo.distance + adjacentRoad.getDistance();

        if (adjacentRoadInfo.distance > distance) {
          adjacentRoadInfo.distance = distance;
          adjacentRoadInfo.next = currentNode;
        }
      }
    }

    graph[currentNode.name].isVisited = true;
    totalVisitedRoads++;

    const unvisitedRoad = getUnvisitedRoadWithMinDistance(graph);
    if (unvisitedRoad) {
      currentNode = unvisitedRoad.road!;
      currentGraphNodeInfo = graph[currentNode.name];
    }
  }

  return getPath(graph, departureRoad, destinationRoad.name);
};
