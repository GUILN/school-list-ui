jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import PrintSchoolListPage from "../print-school-list";

describe("PrintSchoolListPage", () => {
  test("renders the new print shell content", () => {
    render(<PrintSchoolListPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Imprimir lista de escolas",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Saída")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Configurações de impressão",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Status da geração" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Layout final" }),
    ).toBeInTheDocument();

    expect(screen.getByText("A4 retrato")).toBeInTheDocument();
    expect(screen.getByText("Prioridade da seleção")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Preparar impressão" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Nenhuma lista pronta para impressão",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Exportar PDF" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ir para criação da lista" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Revisar opções" }),
    ).toBeInTheDocument();
  });
});
