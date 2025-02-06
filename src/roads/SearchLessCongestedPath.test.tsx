import { render, screen, fireEvent } from "@testing-library/react";
import { SearchLessCongestedPath } from "./SearchLessCongestedPath";
import { initRoadDict } from "../utils";

describe("SearchLessCongestedPath", () => {
  const departureRoadName = "NE 42nd Way";
  const destinationRoadName = "206th PI NE";

  test("Search when there's no traffic correctly", () => {
    render(<SearchLessCongestedPath roads={initRoadDict()} />);

    const departureRoadInput = screen.getByTestId("departure-road-input");
    fireEvent.change(departureRoadInput, {
      target: { value: departureRoadName },
    });

    const destinationRoadInput = screen.getByTestId("destination-road-input");
    fireEvent.change(destinationRoadInput, {
      target: { value: destinationRoadName },
    });

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    const searchResult = screen.getByTestId(`search-result`);
    expect(searchResult).toHaveTextContent(
      "NE 42nd Way > NE 42nd St > NE 39th St > 204th Ave NE > 206th PI NE"
    );
  });

  test("Search when there are 3 buses on 'NE 39th St' road correctly", () => {
    const roads = initRoadDict();
    roads["NE 39th St"].addVehicle("BUS");
    roads["NE 39th St"].addVehicle("BUS");
    roads["NE 39th St"].addVehicle("BUS");

    render(<SearchLessCongestedPath roads={roads} />);

    const departureRoadInput = screen.getByTestId("departure-road-input");
    fireEvent.change(departureRoadInput, {
      target: { value: departureRoadName },
    });

    const destinationRoadInput = screen.getByTestId("destination-road-input");
    fireEvent.change(destinationRoadInput, {
      target: { value: destinationRoadName },
    });

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    const searchResult = screen.getByTestId(`search-result`);
    expect(searchResult).toHaveTextContent(
      "NE 42nd Way > NE 42nd St > 203rd Ave NE > 204th Ave NE > 206th PI NE"
    );
  });
});
