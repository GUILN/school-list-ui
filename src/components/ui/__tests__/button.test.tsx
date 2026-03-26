// Mock problematic modules before imports
jest.mock("@/lib/env", () => ({
  isDevelopmentMode: () => false,
  getApiUrl: () => "http://localhost:3000/api",
}));

jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button Component", () => {
  test("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-9");
  });

  test("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive");
  });

  test("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: /outline/i });
    expect(button).toHaveClass("border-input");
  });

  test("renders with small size", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button", { name: /small/i });
    expect(button).toHaveClass("h-8");
  });

  test("renders with large size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });
    expect(button).toHaveClass("h-10");
  });

  test("renders with icon size", () => {
    render(<Button size="icon">⭐</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-9");
    expect(button).toHaveClass("w-9");
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  test("renders as a child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/destino">Ir para destino</a>
      </Button>,
    );

    expect(
      screen.getByRole("link", { name: /ir para destino/i }),
    ).toHaveAttribute("href", "/destino");
  });
});
