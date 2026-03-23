import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "../main-layout";

// Mock SideMenu component
jest.mock("../side-menu", () => {
  return function MockSideMenu() {
    return <div data-testid="side-menu">Side Menu</div>;
  };
});

// Mock routes
jest.mock("../../routes", () => [
  { path: "/", name: "Home" },
  { path: "/user-profile", name: "Meu Perfil" },
  { path: "/user-address", name: "Endereços" },
  { path: "/create-school-list", name: "Criar Lista de Escolas" },
  { path: "/print-school-list", name: "Imprimir Lista de Escolas" },
]);

describe("MainLayout Component", () => {
  const renderMainLayout = (initialPath = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <MainLayout />
      </MemoryRouter>,
    );
  };

  test("renders layout structure correctly", () => {
    renderMainLayout();

    expect(screen.getByTestId("side-menu")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });

  test("displays correct header title for home route", () => {
    renderMainLayout("/");
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("displays correct header title for user profile route", () => {
    renderMainLayout("/user-profile");
    expect(screen.getByText("Meu Perfil")).toBeInTheDocument();
  });

  test("displays correct header title for user address route", () => {
    renderMainLayout("/user-address");
    expect(screen.getByText("Endereços")).toBeInTheDocument();
  });

  test("displays correct header title for create school list route", () => {
    renderMainLayout("/create-school-list");
    expect(screen.getByText("Criar Lista de Escolas")).toBeInTheDocument();
  });

  test("displays correct header title for print school list route", () => {
    renderMainLayout("/print-school-list");
    expect(screen.getByText("Imprimir Lista de Escolas")).toBeInTheDocument();
  });

  test("displays default title for unknown route", () => {
    renderMainLayout("/unknown-route");
    // For unknown routes, the headerTitle will be undefined, check the main header title specifically
    const mainTitleElement = screen.getByTestId("main-header-title");
    expect(mainTitleElement).toBeInTheDocument();
    expect(mainTitleElement).toHaveTextContent(""); // Should be empty for unknown routes
  });

  test("updates header title when route changes", () => {
    // Test home route
    const { unmount: unmountHome } = renderMainLayout("/");
    const mainTitleElement = screen.getByTestId("main-header-title");
    expect(mainTitleElement).toHaveTextContent("Home");
    unmountHome();

    // Test user-profile route
    renderMainLayout("/user-profile");
    const profileTitleElement = screen.getByTestId("main-header-title");
    expect(profileTitleElement).toHaveTextContent("Meu Perfil");
  });

  test("renders routes correctly", () => {
    renderMainLayout();
    // Check that both header elements are rendered
    expect(screen.getByText("Home")).toBeInTheDocument(); // Main title for home route
    expect(screen.getByText("Bottom Navigation")).toBeInTheDocument(); // Bottom nav header
  });

  test("has correct layout classes", () => {
    const { container } = renderMainLayout();
    const layoutDiv = container.querySelector(".w-full.h-svh.max-h-svh.flex");

    expect(layoutDiv).toBeInTheDocument();
    expect(layoutDiv).toHaveClass("flex");
  });
});
