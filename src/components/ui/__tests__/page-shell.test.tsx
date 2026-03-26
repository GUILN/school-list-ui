jest.mock("@/lib/utils", () => ({
  cn: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" "),
  isDevelopmentMode: () => false,
}));

import { render, screen } from "@testing-library/react";
import {
  PageCard,
  PageCardContent,
  PageCardFooter,
  PageCardHeader,
  PageHeader,
  PageSection,
  PageShell,
} from "../page-shell";

describe("page shell primitives", () => {
  test("renders page shell header and section content", () => {
    render(
      <PageShell>
        <PageHeader
          title="Título da página"
          description="Descrição principal da página"
          eyebrow="Resumo"
          actions={<button type="button">Ação principal</button>}
        />
        <PageSection
          title="Seção importante"
          description="Detalhes da seção"
          action={<button type="button">Ver mais</button>}
        >
          <p>Conteúdo da seção</p>
        </PageSection>
      </PageShell>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Título da página" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(
      screen.getByText("Descrição principal da página"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Seção importante" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Detalhes da seção")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da seção")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ação principal" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ver mais" }),
    ).toBeInTheDocument();
  });

  test("renders page card header content and footer", () => {
    render(
      <PageCard>
        <PageCardHeader
          title="Card principal"
          description="Resumo do card"
          action={<button type="button">Editar</button>}
        />
        <PageCardContent>
          <p>Informações do card</p>
        </PageCardContent>
        <PageCardFooter>
          <span>Status atualizado</span>
          <button type="button">Salvar</button>
        </PageCardFooter>
      </PageCard>,
    );

    expect(
      screen.getByRole("heading", { level: 4, name: "Card principal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Resumo do card")).toBeInTheDocument();
    expect(screen.getByText("Informações do card")).toBeInTheDocument();
    expect(screen.getByText("Status atualizado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  test("renders shared primitives without optional actions or descriptions", () => {
    render(
      <PageShell>
        <PageHeader title="Página simples" description="Descrição simples" />
        <PageSection title="Seção simples">
          <PageCard>
            <PageCardHeader title="Card simples" />
            <PageCardContent>
              <p>Conteúdo essencial</p>
            </PageCardContent>
          </PageCard>
        </PageSection>
      </PageShell>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Página simples" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Seção simples" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Card simples" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Conteúdo essencial")).toBeInTheDocument();
  });
});
