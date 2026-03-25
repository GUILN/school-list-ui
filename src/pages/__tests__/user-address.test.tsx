jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import UserAddressPage from "../user-address";

describe("UserAddressPage", () => {
  test("renders the new address shell content", () => {
    render(<UserAddressPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Endereços" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Localização")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Endereço principal" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Endereços adicionais" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Cadastro atual" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Principal")).toBeInTheDocument();
    expect(screen.getByDisplayValue("01000-000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("São Paulo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar endereço" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Nenhum endereço adicional cadastrado",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cadastrar endereço complementar" }),
    ).toBeInTheDocument();
  });
});
