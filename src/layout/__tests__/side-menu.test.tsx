jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
  { path: "/", name: "Home", iconName: "House" },
  { path: "/user-profile", name: "Meu Perfil", iconName: "User" },
  { path: "/user-address", name: "Endereços", iconName: "Building" },
  {
    path: "/create-school-list",
    name: "Criar Lista de Escolas",
    iconName: "School",
  },
  {
    path: "/print-school-list",
    name: "Imprimir Lista de Escolas",
    iconName: "Printer",
  },
]);

describe("SideMenu Component", () => {
  const renderSideMenu = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <SideMenu />
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

    // Both links should be rendered regardless of current route
    expect(activeLink).toBeInTheDocument();
    expect(otherLink).toBeInTheDocument();
  });

  test("renders items in correct order", () => {
    renderSideMenu();

    const menuItems = screen.getAllByRole("link");
    expect(menuItems[0]).toHaveTextContent("Home");
    expect(menuItems[1]).toHaveTextContent("Meu Perfil");
    expect(menuItems[2]).toHaveTextContent("Endereços");
    expect(menuItems[3]).toHaveTextContent("Criar Lista de Escolas");
    expect(menuItems[4]).toHaveTextContent("Imprimir Lista de Escolas");
  });
});
