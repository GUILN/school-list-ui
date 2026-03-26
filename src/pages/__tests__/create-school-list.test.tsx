jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import CreateSchoolListPage from "../create-school-list";

describe("CreateSchoolListPage", () => {
  test("renders the new create-list shell content", () => {
    render(<CreateSchoolListPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Criar lista de escolas" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Configuração")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Critérios iniciais" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Prévia da lista" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Preferências de busca" }),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Lista prioritária 2025"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Zona Norte")).toBeInTheDocument();
    expect(screen.getByText("Ensino Fundamental")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Limpar filtros" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar rascunho" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "A prévia da lista aparecerá aqui",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Gerar prévia" }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Revisar filtros" }),
    ).toBeInTheDocument();
  });
});
