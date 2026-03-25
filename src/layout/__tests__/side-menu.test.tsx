jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SideMenu from "../side-menu";

// Mock lucide-react icons with proper icons object structure
jest.mock("lucide-react", () => ({
  icons: {
    House: () => <div data-testid="house-icon" />,
    User: () => <div data-testid="user-icon" />,
    Building: () => <div data-testid="building-icon" />,
    School: () => <div data-testid="school-icon" />,
    Printer: () => <div data-testid="printer-icon" />,
  },
}));

// Mock routes
jest.mock("../../routes", () => [
  {
    path: "/",
    name: "Home",
    iconName: "House",
    component: () => <div>Home page</div>,
  },
  {
    path: "/user-profile",
    name: "Meu Perfil",
    iconName: "User",
    component: () => <div>Meu Perfil page</div>,
  },
  {
    path: "/user-address",
    name: "Endereços",
    iconName: "Building",
    component: () => <div>Endereços page</div>,
  },
  {
    path: "/create-school-list",
    name: "Criar Lista de Escolas",
    iconName: "School",
    component: () => <div>Criar Lista de Escolas page</div>,
  },
  {
    path: "/print-school-list",
    name: "Imprimir Lista de Escolas",
    iconName: "Printer",
    component: () => <div>Imprimir Lista de Escolas page</div>,
  },
]);

import routes from "../../routes";

describe("SideMenu Component", () => {
  const renderSideMenu = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <SideMenu />
      </MemoryRouter>,
    );
  };

  const renderSideMenuWithRoutes = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <div>
          <SideMenu />
          <Routes>
            {routes.map((route) => (
              <Route
                Component={route.component}
                key={route.path}
                path={route.path}
              />
            ))}
          </Routes>
        </div>
      </MemoryRouter>,
    );
  };

  test("renders all menu items from routes", () => {
    renderSideMenu();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Meu Perfil")).toBeInTheDocument();
    expect(screen.getByText("Endereços")).toBeInTheDocument();
    expect(screen.getByText("Criar Lista de Escolas")).toBeInTheDocument();
    expect(screen.getByText("Imprimir Lista de Escolas")).toBeInTheDocument();
  });

  test("renders correct icons for each menu item", () => {
    renderSideMenu();

    expect(screen.getByTestId("house-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
    expect(screen.getByTestId("building-icon")).toBeInTheDocument();
    expect(screen.getByTestId("school-icon")).toBeInTheDocument();
    expect(screen.getByTestId("printer-icon")).toBeInTheDocument();
  });

  test("renders navigation links with correct href attributes", () => {
    renderSideMenu();

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /meu perfil/i })).toHaveAttribute(
      "href",
      "/user-profile",
    );
    expect(screen.getByRole("link", { name: /endereços/i })).toHaveAttribute(
      "href",
      "/user-address",
    );
    expect(screen.getByRole("link", { name: /criar lista/i })).toHaveAttribute(
      "href",
      "/create-school-list",
    );
    expect(
      screen.getByRole("link", { name: /imprimir lista/i }),
    ).toHaveAttribute("href", "/print-school-list");
  });

  test("renders menu items for current route", () => {
    renderSideMenu(["/user-profile"]);

    const activeLink = screen.getByRole("link", { name: /meu perfil/i });
    const otherLink = screen.getByRole("link", { name: /home/i });

    expect(activeLink).toBeInTheDocument();
    expect(otherLink).toBeInTheDocument();
    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(otherLink).not.toHaveAttribute("aria-current");
  });

  test("navigates to the selected route from the desktop sidebar", async () => {
    const user = userEvent.setup();

    renderSideMenuWithRoutes();

    expect(screen.getByText("Home page")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /meu perfil/i }));

    expect(screen.getByText("Meu Perfil page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /meu perfil/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /home/i })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
