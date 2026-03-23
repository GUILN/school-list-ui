import { render, screen } from "@testing-library/react";
import PrintSchoolListPage from "../print-school-list";

describe("PrintSchoolListPage Component", () => {
  test("renders print school list page heading", () => {
    render(<PrintSchoolListPage />);
    expect(
      screen.getByRole("heading", { name: /print school list/i }),
    ).toBeInTheDocument();
  });

  test("displays correct heading text", () => {
    render(<PrintSchoolListPage />);
    expect(screen.getByText("Print School List")).toBeInTheDocument();
  });
});
