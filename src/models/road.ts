import { Vehicle } from "../types/vehicle.type";

export class Road {
  name!: string;
  congestionValue!: number;
  vehicles!: { bike: number; car: number; bus: number };
  adjacentRoads!: Road[];

  constructor(name: string) {
    this.name = name;
    this.congestionValue = 0;
    this.vehicles = { bike: 0, car: 0, bus: 0 };
    this.adjacentRoads = [];
  }

  getDistance(): number {
    // we add 1 here as default distance/congestionValue,
    // since may get congestionValue=0
    return this.congestionValue + 1;
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
