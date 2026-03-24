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
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input Component", () => {
  test("renders input element", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("applies default classes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("flex");
    expect(input).toHaveClass("h-9");
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("rounded-md");
  });

  test("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  test("handles input value changes", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test value");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test value");
  });

  test("accepts placeholder prop", () => {
    render(<Input placeholder="Enter text here" />);
    const input = screen.getByPlaceholderText("Enter text here");
    expect(input).toBeInTheDocument();
  });

  test("accepts type prop", () => {
    const { container } = render(<Input type="password" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("accepts defaultValue prop", () => {
    render(<Input defaultValue="default text" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("default text");
  });
});
