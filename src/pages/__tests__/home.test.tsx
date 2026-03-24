import { render, screen } from "@testing-library/react";
import HomePage from "../home";

describe("HomePage Component", () => {
  test("renders home page heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /home page/i }),
    ).toBeInTheDocument();
  });

  test("displays correct heading text", () => {
    render(<HomePage />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
