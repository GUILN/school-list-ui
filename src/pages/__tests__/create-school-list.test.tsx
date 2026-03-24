import { render, screen } from "@testing-library/react";
import CreateSchoolListPage from "../create-school-list";

describe("CreateSchoolListPage Component", () => {
  test("renders create school list page heading", () => {
    render(<CreateSchoolListPage />);
    expect(
      screen.getByRole("heading", { name: /create school list/i }),
    ).toBeInTheDocument();
  });

  test("displays correct heading text", () => {
    render(<CreateSchoolListPage />);
    expect(screen.getByText("Create School List")).toBeInTheDocument();
  });
});
