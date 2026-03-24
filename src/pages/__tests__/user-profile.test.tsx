import { render, screen } from "@testing-library/react";
import UserProfilePage from "../user-profile";

describe("UserProfilePage Component", () => {
  test("renders user profile page heading", () => {
    render(<UserProfilePage />);
    expect(
      screen.getByRole("heading", { name: /profile page/i }),
    ).toBeInTheDocument();
  });

  test("displays correct heading text", () => {
    render(<UserProfilePage />);
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });
});
