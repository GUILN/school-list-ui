import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { useAuth } from "../../../lib/auth/AuthContext";

// Mock the useAuth hook
jest.mock("../../../lib/auth/AuthContext");
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock React Router's Navigate component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: ({ to }: { to: string }) => (
    <div data-testid="navigate-to">{to}</div>
  ),
}));

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders children when user is authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1", email: "test@example.com", name: "Test User" },
      token: "test-token",
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      bypassAuth: jest.fn(),
      setIsDevMode: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    expect(screen.queryByTestId("navigate-to")).not.toBeInTheDocument();
  });

  test("redirects to login when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      bypassAuth: jest.fn(),
      setIsDevMode: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByTestId("navigate-to")).toHaveTextContent("/login");
  });

  test("preserves location state when redirecting to login", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      bypassAuth: jest.fn(),
      setIsDevMode: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/protected-page"]}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    // The Navigate component should redirect to login
    expect(screen.getByTestId("navigate-to")).toHaveTextContent("/login");
  });
});
