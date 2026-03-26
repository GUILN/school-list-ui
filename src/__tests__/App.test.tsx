import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../lib/auth/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));
jest.mock("../lib/theme/ThemeContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));
jest.mock("../layout/main-layout", () => {
  return function MockMainLayout() {
    return <div data-testid="main-layout">Main Layout</div>;
  };
});
jest.mock("../pages/auth/LoginPage", () => ({
  LoginPage: function MockLoginPage() {
    return <div data-testid="login-page">Login Page</div>;
  },
}));
jest.mock("../components/auth/ProtectedRoute", () => ({
  ProtectedRoute: function MockProtectedRoute({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="protected-route">{children}</div>;
  },
}));

describe("App Component", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  test("renders the protected shell for non-login routes", () => {
    render(<App />);

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
    expect(screen.getByTestId("auth-provider")).toBeInTheDocument();
    expect(screen.getByTestId("protected-route")).toBeInTheDocument();
    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });

  test("renders the login route at /login", () => {
    window.history.pushState({}, "", "/login");

    render(<App />);

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
    expect(screen.getByTestId("auth-provider")).toBeInTheDocument();
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.queryByTestId("protected-route")).not.toBeInTheDocument();
  });
});
