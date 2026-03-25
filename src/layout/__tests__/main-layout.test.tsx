jest.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "../main-layout";

// Mock SideMenu component
jest.mock("../side-menu", () => {
  return function MockSideMenu() {
    return <div data-testid="side-menu">Side Menu</div>;
  };
});

jest.mock("@/components/ui/theme-toggle", () => ({
  ThemeToggle: function MockThemeToggle() {
    return (
      <button aria-label="Switch to dark mode" data-testid="theme-toggle" />
    );
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
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByText("Home page")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open navigation menu/i }),
    ).toBeInTheDocument();
  });

  test.each([
    ["/", "Home", "Home page"],
    ["/user-profile", "Meu Perfil", "Meu Perfil page"],
    ["/user-address", "Endereços", "Endereços page"],
    [
      "/create-school-list",
      "Criar Lista de Escolas",
      "Criar Lista de Escolas page",
    ],
    [
      "/print-school-list",
      "Imprimir Lista de Escolas",
      "Imprimir Lista de Escolas page",
    ],
  ])(
    "keeps the expected title and route content for %s",
    (initialPath, expectedTitle, expectedContent) => {
      renderMainLayout(initialPath);

      expect(screen.getByTestId("main-header-title")).toHaveTextContent(
        expectedTitle,
      );
      expect(screen.getByText(expectedContent)).toBeInTheDocument();
    },
  );

  test("displays default title for unknown route", () => {
    renderMainLayout("/unknown-route");
    const mainTitleElement = screen.getByTestId("main-header-title");

    expect(mainTitleElement).toBeInTheDocument();
    expect(mainTitleElement).toHaveTextContent("");
  });

  test("updates header title when route changes", () => {
    const { unmount: unmountHome } = renderMainLayout("/");

    expect(screen.getByTestId("main-header-title")).toHaveTextContent("Home");
    unmountHome();

    renderMainLayout("/user-profile");

    expect(screen.getByTestId("main-header-title")).toHaveTextContent(
      "Meu Perfil",
    );
  });

  test("opens and closes the mobile navigation drawer", async () => {
    const user = userEvent.setup();

    renderMainLayout();

    const openButton = screen.getByRole("button", {
      name: /open navigation menu/i,
    });

    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await user.click(openButton);

    expect(
      screen.getByRole("dialog", { name: /navigation menu/i }),
    ).toBeVisible();
    expect(openButton).toHaveAttribute("aria-expanded", "true");

    await user.click(
      screen.getByRole("button", { name: /close navigation menu/i }),
    );

    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("dialog", { hidden: true, name: /navigation menu/i }),
    ).toHaveClass("-translate-x-full");
  });

  test("closes the mobile drawer when a navigation item is selected", async () => {
    const user = userEvent.setup();

    renderMainLayout();

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    await user.click(screen.getByRole("link", { name: /meu perfil/i }));

    expect(screen.getByTestId("main-header-title")).toHaveTextContent(
      "Meu Perfil",
    );
    expect(screen.getByText("Meu Perfil page")).toBeInTheDocument();
    expect(
      screen.getByRole("dialog", { hidden: true, name: /navigation menu/i }),
    ).toHaveClass("-translate-x-full");
  });

  test("has correct layout classes", () => {
    const { container } = renderMainLayout();
    const layoutDiv = container.querySelector(".flex.min-h-svh.w-full");

    expect(layoutDiv).toBeInTheDocument();
    expect(layoutDiv).toHaveClass("flex");
  });
});
