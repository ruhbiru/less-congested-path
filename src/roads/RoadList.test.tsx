import { fireEvent, render, screen, within } from "@testing-library/react";
import { RoadList } from "./RoadList";
import { initRoadDict } from "../utils";
import { useState } from "react";

const MockRoadList = () => {
  const [roads, setRoads] = useState(initRoadDict());
  return (
    <RoadList
      roads={roads}
      onChanged={(road) => setRoads((prev) => ({ ...prev, [road.name]: road }))}
    />
  );
};

describe("RoadList", () => {
  const roadName = "NE 42nd Way";
  let section: HTMLElement;

  beforeEach(() => {
    render(<MockRoadList />);
    section = screen.getByTestId(roadName);
  });

  test("Add vehicle on the road correctly", () => {
    const button = within(section).getByRole("button", { name: "Add" });
    fireEvent.click(button);

    const vehicleInfo = within(section).getByTestId(`${roadName}-vehicle-info`);
    expect(vehicleInfo).toHaveTextContent(
      `Bike: 1, Car: 0, Bus: 0 --- ${roadName}`
    );

    const selectElement = within(section).getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "CAR" } });

    fireEvent.click(button);

    expect(vehicleInfo).toHaveTextContent(
      `Bike: 1, Car: 1, Bus: 0 --- ${roadName}`
    );
  });

  test("Delete vehicle on the road correctly", () => {
    const button = within(section).getByRole("button", { name: "Add" });
    fireEvent.click(button);
    fireEvent.click(button);

    const vehicleInfo = within(section).getByTestId(`${roadName}-vehicle-info`);
    expect(vehicleInfo).toHaveTextContent(
      `Bike: 2, Car: 0, Bus: 0 --- ${roadName}`
    );

    const deleteButton = within(section).getByRole("button", {
      name: "Delete",
    });
    fireEvent.click(deleteButton);

    expect(vehicleInfo).toHaveTextContent(
      `Bike: 1, Car: 0, Bus: 0 --- ${roadName}`
    );
  });
});
