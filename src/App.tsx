import { useState } from "react";
import "./App.css";
import { Road } from "./roads/models/road";
import { initRoadDict } from "./utils";
import { RoadDict } from "./roads/types/road-dict";
import { RoadList } from "./roads/RoadList";
import { SearchLessCongestedPath } from "./roads/SearchLessCongestedPath";

const App = () => {
  const [roads, setRoads] = useState(initRoadDict());

  const onRoadChanged = (road: Road) => {
    setRoads((prev: RoadDict) => ({ ...prev, [road.name]: road }));
  };

  return (
    <div className="App">
      <main className="App-content">
        <img src="map.png" width={600} alt="map" />
        <RoadList roads={roads} onChanged={onRoadChanged} />
        <SearchLessCongestedPath roads={roads} />
      </main>
    </div>
  );
};

export default App;
