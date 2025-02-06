import { Road } from "./road";

describe("Road", () => {
  let road: Road;

  beforeEach(() => {
    road = new Road("NE 42nd Way");
  });

  test("Add vehicles correctly", () => {
    road.addVehicle("BIKE");

    road.addVehicle("CAR");
    road.addVehicle("CAR");

    road.addVehicle("BUS");
    road.addVehicle("BUS");
    road.addVehicle("BUS");

    expect(
      road.vehicles.bike === 1 &&
        road.vehicles.car === 2 &&
        road.vehicles.bus === 3
    ).toBe(true);
  });

  test("Delete vehicles correctly", () => {
    road.deleteVehicle("BIKE");

    road.addVehicle("CAR");
    road.addVehicle("CAR");
    road.deleteVehicle("CAR");

    road.addVehicle("BUS");
    road.addVehicle("BUS");
    road.addVehicle("BUS");
    road.deleteVehicle("BUS");

    expect(
      road.vehicles.bike === 0 &&
        road.vehicles.car === 1 &&
        road.vehicles.bus === 2
    ).toBe(true);
  });

  test("Get congestion value with no vehicles", () => {
    expect(road.getCongestionValue()).toBe(1);
  });

  test("Get congestion value with vehicles", () => {
    road.addVehicle("BIKE");
    road.addVehicle("CAR");
    road.addVehicle("BUS");
    expect(road.getCongestionValue()).toBe(8);
  });
});
