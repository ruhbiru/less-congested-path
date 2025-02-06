import { useState } from "react";
import { RoadDict } from "./types/road-dict";
import { Vehicle } from "./types/vehicle.type";
import { Road } from "./models/road";
import "./styles.css";

interface RoadListProps {
  roads: RoadDict;
  onChanged: (road: Road) => void;
}

export const RoadList: React.FC<RoadListProps> = ({ roads, onChanged }) => {
  const [selectedVehicles, setSelectedVehicles] = useState<{
    [name: string]: Vehicle;
  }>({});

  const setSelectedVehicleType = (roadName: string, value: Vehicle) => {
    setSelectedVehicles((prev) => ({
      ...prev,
      [roadName]: value, // Store selected value per road
    }));
  };

  const addVehicle = (road: Road, vehicle: Vehicle) => {
    road.addVehicle(vehicle);
    onChanged(road);
  };

  const deleteVehicle = (road: Road, vehicle: Vehicle) => {
    road.deleteVehicle(vehicle);
    onChanged(road);
  };

  return (
    <div>
      <ul>
        {Object.keys(roads).map((roadName) => {
          const road = roads[roadName];
          return (
            <li key={road.name}>
              <div data-testid={road.name} className="road-item">
                <div data-testid={`${road.name}-vehicle-info`}>
                  Bike: {road.vehicles.bike}, Car: {road.vehicles.car}, Bus:{" "}
                  {road.vehicles.bus} --- {road.name}
                </div>
                <div className="input-container">
                  <select
                    value={selectedVehicles[road.name] || "BIKE"}
                    onChange={(e) =>
                      setSelectedVehicleType(
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
                    className="add-button button"
                    onClick={() =>
                      addVehicle(road, selectedVehicles[road.name] || "BIKE")
                    }
                  >
                    Add
                  </button>
                  <button
                    className="delete-button button"
                    onClick={() =>
                      deleteVehicle(road, selectedVehicles[road.name] || "BIKE")
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
  );
};
