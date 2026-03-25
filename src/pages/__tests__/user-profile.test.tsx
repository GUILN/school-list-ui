jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import UserProfilePage from "../user-profile";

describe("UserProfilePage", () => {
  test("renders the new profile shell content", () => {
    render(<UserProfilePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Meu perfil" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Dados principais" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Situação do cadastro" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Identificação do usuário",
      }),
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue("Ana Souza Pereira")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123.456.789-00")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Revisar documentos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar alterações" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Solicitar atualização" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Confirmação de dados pendente",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ver pendências" }),
    ).toBeInTheDocument();
  });
});
