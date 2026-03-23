import { render, screen } from "@testing-library/react";
import UserAddressPage from "../user-address";

describe("UserAddressPage Component", () => {
  test("renders user address page heading", () => {
    render(<UserAddressPage />);
    expect(
      screen.getByRole("heading", { name: /user address page/i }),
    ).toBeInTheDocument();
  });

  test("displays correct heading text", () => {
    render(<UserAddressPage />);
    expect(screen.getByText("User Address Page")).toBeInTheDocument();
  });
});
