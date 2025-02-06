import { Vehicle } from "../types/vehicle.type";

export class Road {
  name!: string;
  private congestionValue!: number;
  vehicles!: { bike: number; car: number; bus: number };
  adjacentRoads!: Road[];

  constructor(name: string) {
    this.name = name;

    // default congestion value = 1
    this.congestionValue = 1;
    this.vehicles = { bike: 0, car: 0, bus: 0 };
    this.adjacentRoads = [];
  }

  getCongestionValue(): number {
    return this.congestionValue;
  }

  addVehicle(vehicle: Vehicle): void {
    switch (vehicle) {
      case "BIKE":
        this.vehicles.bike++;
        this.congestionValue++;
        break;
      case "CAR":
        this.vehicles.car++;
        this.congestionValue += 2;
        break;
      default:
        this.vehicles.bus++;
        this.congestionValue += 4;
        break;
    }
  }

  deleteVehicle(vehicle: Vehicle): void {
    switch (vehicle) {
      case "BIKE":
        if (this.vehicles.bike) {
          this.vehicles.bike--;
          this.congestionValue--;
        }

        break;
      case "CAR":
        if (this.vehicles.car) {
          this.vehicles.car--;
          this.congestionValue -= 2;
        }

        break;
      default:
        if (this.vehicles.bus) {
          this.vehicles.bus--;
          this.congestionValue -= 4;
        }
        break;
    }
  }
}
