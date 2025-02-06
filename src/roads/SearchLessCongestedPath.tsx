import { useState } from "react";
import { RoadDict } from "./types/road-dict";
import { getLessCongestedPath } from "../utils";

interface RoadListProps {
  roads: RoadDict;
}

export const SearchLessCongestedPath: React.FC<RoadListProps> = ({ roads }) => {
  const [departureRoadName, setDepartureRoadName] = useState("");
  const [destinationRoadName, setDestinationRoadName] = useState("");
  const [lessCongestedPath, setLessCongestedPath] = useState("");

  const searchPath = () => {
    const departureRoad = roads[departureRoadName];
    const destinationRoad = roads[destinationRoadName];
    if (!departureRoad || !destinationRoad) {
      alert("invalid departure/ destination road!");
      return;
    }

    if (departureRoad.name === destinationRoad.name) {
      alert("you already on the road!");
      return;
    }

    const path = getLessCongestedPath(roads, departureRoad, destinationRoad);
    setLessCongestedPath(path.join(" > "));
  };

  return (
    <div style={{ margin: "1rem" }} className="search-container">
      <div>Search a less congested path</div>
      <div style={{ width: 350, marginTop: 5 }} className="road-input">
        Departure road name:
        <input
          data-testid="departure-road-input"
          onChange={(e) => setDepartureRoadName(e.target.value)}
        />
      </div>
      <div style={{ width: 350, marginTop: 5 }} className="road-input">
        Destination road name:
        <input
          data-testid="destination-road-input"
          onChange={(e) => setDestinationRoadName(e.target.value)}
        />{" "}
      </div>
      <button style={{ marginTop: 10 }} onClick={() => searchPath()}>
        Search
      </button>
      <div>Less Congested Path: </div>
      <div data-testid="search-result">{lessCongestedPath}</div>
    </div>
  );
};
