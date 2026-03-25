jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import HomePage from "../home";

describe("HomePage", () => {
  test("renders the new overview shell content", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Painel inicial" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Visão geral")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Resumo do seu acesso" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Acompanhamento da seleção",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Nenhuma lista iniciada até o momento",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Situação atual" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 5, name: "Atualize seu perfil" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Em revisão")).toBeInTheDocument();
    expect(screen.getByText("Listas criadas")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar nova lista" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ver critérios atuais" }),
    ).toBeInTheDocument();
  });
});
