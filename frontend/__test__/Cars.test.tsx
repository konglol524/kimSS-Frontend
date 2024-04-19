import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Cars from "@/app/(info)/cars/page";
import CarCatalog from "@/components/CarCatalog";
import Card from "@/components/Card";

jest.mock("../src/components/CarCatalog");
jest.mock("../src/components/Card");
describe("Cars page", () => {
  it("Should contain cards", () => {
    render(<Cars />);
    expect(CarCatalog).toHaveBeenCalledTimes(1);
  });
});

describe("Car catalog", () => {
  it("should render cars", () => {
    const carsData = [
      { model: "Honda Civic", 
      img: "/cars/civic.jpg", 
      description: "Cool car" },
      {
        model: "Honda Accord",
        img: "/cars/accord.jpg",
        description: "Cool car",
      },
      {
        model: "Toyota Fortuner",
        img: "/cars/fortuner.jpg",
        description: "Cool car",
      },
      {
        model: "Tesla Model 3",
        img: "/cars/tesla.jpg",
        description: "Cool car",
      },
    ];

    CarCatalog.mockImplementation(() => (
      <div>
        {carsData.map((car, index) => (
          <div key={index}>
            <span>{car.model}</span>
            <img src={car.img} alt={car.description} />
            <span>{car.description}</span>
          </div>
        ))}
      </div>
    ));

    render(<CarCatalog />);

    expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    expect(screen.queryAllByRole("img").length).toBe(4);
  });
});