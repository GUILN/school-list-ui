import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeContext";

const createMatchMediaResult = (matches: boolean, query: string) => ({
  matches,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <span>{theme}</span>
      <button onClick={toggleTheme} type="button">
        Toggle theme
      </button>
    </>
  );
};

describe("ThemeContext", () => {
  const matchMediaMock = window.matchMedia as jest.Mock;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";

    matchMediaMock.mockImplementation((query: string) =>
      createMatchMediaResult(false, query),
    );
  });

  test("applies persisted theme from localStorage", () => {
    window.localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  test("falls back to system preference when there is no persisted theme", () => {
    matchMediaMock.mockImplementation((query: string) =>
      createMatchMediaResult(true, query),
    );

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  test("falls back to light theme when persisted theme is invalid", () => {
    window.localStorage.setItem("theme", "sepia");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  test("toggles the dark class and persists theme changes", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("light");

    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  test("throws when useTheme is called outside a provider", () => {
    const renderWithoutProvider = () => render(<ThemeConsumer />);

    expect(renderWithoutProvider).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });
});
