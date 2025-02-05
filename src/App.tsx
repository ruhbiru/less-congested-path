import { useState } from "react";
import "./App.css";
import { Road } from "./models/road";
import { initRoadDict, getLessCongestedPath } from "./utils";
import { Vehicle } from "./types/vehicle.type";

const App = () => {
  const [roads, setRoads] = useState(initRoadDict());

  const [selectedVehicles, setSelectedVehicles] = useState<{
    [name: string]: Vehicle;
  }>({});
  const [departureRoadName, setDepartureRoadName] = useState("");
  const [destinationRoadName, setDestinationRoadName] = useState("");
  const [lessCongestedPath, setLessCongestedPath] = useState("");

  const handleSelectChange = (roadName: string, value: Vehicle) => {
    setSelectedVehicles((prev) => ({
      ...prev,
      [roadName]: value, // Store selected value per road
    }));
  };

  const addVehicle = (road: Road, vehicle: Vehicle) => {
    road.addVehicle(vehicle);
    // force to re-render
    setRoads((prev) => ({ ...prev, [road.name]: road }));
  };
  const deleteVehicle = (road: Road, vehicle: Vehicle) => {
    road.deleteVehicle(vehicle);
    // force to re-render
    setRoads((prev) => ({ ...prev, [road.name]: road }));
  };

  const searchPath = () => {
    const departureRoad = roads[departureRoadName];
    const destinationRoad = roads[destinationRoadName];
    if (!departureRoad || !destinationRoad) {
      alert("invalid departure/ destination road!");
      return;
    }

    const path = getLessCongestedPath(roads, departureRoad, destinationRoad);
    setLessCongestedPath(path.join(" > "));
  };

  return (
    <div className="App">
      <main className="App-content">
        <img src="map.png" width={600} alt="map" />
        <div>
          <ul>
            {Object.keys(roads).map((roadName) => {
              const road = roads[roadName];
              return (
                <li key={road.name}>
                  <div className="road-item-container">
                    <div>
                      bike: {road.vehicles.bike}, car: {road.vehicles.car}, bus:{" "}
                      {road.vehicles.bus} --- {road.name}
                    </div>
                    <div className="road-item-action">
                      <select
                        style={{ marginRight: 3 }}
                        value={selectedVehicles[road.name] || "BIKE"}
                        onChange={(e) =>
                          handleSelectChange(
                            road.name,
                            e.target.value as Vehicle
                          )
                        }
                      >
                        <option value={"BIKE"}>Bike</option>
                        <option value={"CAR"}>Car</option>
                        <option value={"BUS"}>Bus</option>
                      </select>
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          marginRight: 3,
                        }}
                        onClick={() =>
                          addVehicle(
                            road,
                            selectedVehicles[road.name] || "BIKE"
                          )
                        }
                      >
                        Add
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() =>
                          deleteVehicle(
                            road,
                            selectedVehicles[road.name] || "BIKE"
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ margin: "1rem" }} className="search-container">
          <div>Search a less congested path</div>
          <div style={{ width: 350, marginTop: 5 }} className="road-input">
            Departure road name:
            <input onChange={(e) => setDepartureRoadName(e.target.value)} />
          </div>
          <div style={{ width: 350, marginTop: 5 }} className="road-input">
            Destination road name:
            <input
              onChange={(e) => setDestinationRoadName(e.target.value)}
            />{" "}
          </div>
          <button style={{ marginTop: 10 }} onClick={() => searchPath()}>
            search
          </button>
          <div>Less Congested Path: </div>
          <div>{lessCongestedPath}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
