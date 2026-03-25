import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../LoginPage";
import { useAuth } from "../../../lib/auth/AuthContext";
import { authApi } from "../../../lib/api/auth";

// Mock dependencies
jest.mock("../../../lib/auth/AuthContext");
jest.mock("../../../lib/api/auth");

const mockIsDevelopmentMode = jest.fn(() => false);
jest.mock("../../../lib/env", () => ({
  isDevelopmentMode: () => mockIsDevelopmentMode(),
  getApiUrl: () => "http://localhost:3000/api",
}));

const mockNavigate = jest.fn();
type MockLocationState = { from: { pathname: string } } | null;

const mockUseLocation = jest.fn((): { state: MockLocationState } => ({
  state: null,
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

describe("LoginPage Component", () => {
  const mockLogin = jest.fn();
  const mockBypassAuth = jest.fn();
  const mockSetIsDevMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsDevelopmentMode.mockReturnValue(false);
    mockUseLocation.mockReturnValue({ state: null });
    mockSetIsDevMode.mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: mockLogin,
      logout: jest.fn(),
      bypassAuth: mockBypassAuth,
      setIsDevMode: mockSetIsDevMode,
    });
  });

  const renderLoginPage = () => {
    return render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
  };

  test("renders login form", () => {
    renderLoginPage();

    expect(
      screen.getByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /email address/i }),
    ).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test("submits login form successfully", async () => {
    const user = userEvent.setup();
    const mockAuthResponse = {
      token: "test-token",
      user: { id: "1", email: "test@example.com", name: "Test User" },
    };

    mockAuthApi.login.mockResolvedValue(mockAuthResponse);

    renderLoginPage();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAuthApi.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(mockLogin).toHaveBeenCalledWith("test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    expect(mockAuthApi.login.mock.invocationCallOrder[0]).toBeLessThan(
      mockLogin.mock.invocationCallOrder[0],
    );
    expect(mockLogin.mock.invocationCallOrder[0]).toBeLessThan(
      mockNavigate.mock.invocationCallOrder[0],
    );
  });

  test("redirects to the original route after a successful login", async () => {
    const user = userEvent.setup();
    mockUseLocation.mockReturnValue({
      state: { from: { pathname: "/schools" } },
    });
    mockAuthApi.login.mockResolvedValue({
      token: "test-token",
      user: { id: "1", email: "test@example.com", name: "Test User" },
    });

    renderLoginPage();

    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/schools", { replace: true });
    });
  });

  test("displays error message on login failure", async () => {
    const user = userEvent.setup();
    mockAuthApi.login.mockRejectedValue(new Error("Invalid credentials"));

    renderLoginPage();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Invalid email or password",
      );
    });
  });

  test("displays generic error message when error has no specific message", async () => {
    const user = userEvent.setup();

    mockAuthApi.login.mockRejectedValue(new Error("Network error"));

    renderLoginPage();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  test("shows dev bypass button in development mode", () => {
    mockIsDevelopmentMode.mockReturnValue(true);

    renderLoginPage();

    expect(
      screen.getByRole("button", { name: /dev mode bypass/i }),
    ).toBeInTheDocument();
  });

  test("handles dev bypass button click", async () => {
    const user = userEvent.setup();
    mockIsDevelopmentMode.mockReturnValue(true);
    mockUseLocation.mockReturnValue({
      state: { from: { pathname: "/dashboard" } },
    });

    renderLoginPage();

    await user.click(screen.getByRole("button", { name: /dev mode bypass/i }));

    expect(mockSetIsDevMode).toHaveBeenCalledWith(true);
    expect(mockBypassAuth).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    expect(mockSetIsDevMode.mock.invocationCallOrder[0]).toBeLessThan(
      mockBypassAuth.mock.invocationCallOrder[0],
    );
    expect(mockBypassAuth.mock.invocationCallOrder[0]).toBeLessThan(
      mockNavigate.mock.invocationCallOrder[0],
    );
  });

  test("does not show dev bypass button in production mode", () => {
    renderLoginPage();

    expect(
      screen.queryByRole("button", { name: /dev mode bypass/i }),
    ).not.toBeInTheDocument();
  });

  test("prevents submission with empty fields", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(submitButton);

    expect(mockAuthApi.login).not.toHaveBeenCalled();
  });
});
