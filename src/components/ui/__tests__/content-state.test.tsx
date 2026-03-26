jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { ContentState } from "../content-state";

const CustomIcon = ((props: LucideProps) => (
  <svg data-testid="custom-icon" {...props} />
)) as LucideIcon;

describe("ContentState", () => {
  test.each([
    { title: "Estado padrão", description: "Mensagem padrão" },
    {
      title: "Estado informativo",
      description: "Mensagem informativa",
      tone: "info" as const,
    },
  ])(
    "renders reusable $title state content",
    ({ title, description, tone }) => {
      render(
        <ContentState description={description} title={title} tone={tone} />,
      );

      expect(
        screen.getByRole("heading", { level: 4, name: title }),
      ).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    },
  );

  test("renders title, description, children, and actions", () => {
    render(
      <ContentState
        title="Sem resultados"
        description="Ajuste os filtros para continuar"
        actions={<button type="button">Tentar novamente</button>}
      >
        <p>Dica adicional</p>
      </ContentState>,
    );

    expect(
      screen.getByRole("heading", { level: 4, name: "Sem resultados" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ajuste os filtros para continuar"),
    ).toBeInTheDocument();
    expect(screen.getByText("Dica adicional")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tentar novamente" }),
    ).toBeInTheDocument();
  });

  test("supports a custom icon and alternate tone", () => {
    render(
      <ContentState
        title="Atenção"
        description="Existe uma pendência para revisar"
        icon={CustomIcon}
        tone="warning"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 4, name: "Atenção" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Existe uma pendência para revisar"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
