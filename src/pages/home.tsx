import { Button } from "@/components/ui/button";
import { ContentState } from "@/components/ui/content-state";
import {
  PageCard,
  PageCardContent,
  PageCardHeader,
  PageSection,
  PageShell,
  PageHeader,
} from "@/components/ui/page-shell";
import { ArrowRight, ClipboardCheck, House, MapPinned } from "lucide-react";

const quickActions = [
  {
    title: "Atualize seu perfil",
    description:
      "Confira dados pessoais e garanta que o cadastro esteja correto.",
    icon: House,
  },
  {
    title: "Revise seus endereços",
    description:
      "Confirme o endereço principal e cadastre alternativas quando necessário.",
    icon: MapPinned,
  },
  {
    title: "Prepare sua lista",
    description:
      "Defina filtros de busca antes de gerar uma nova lista de escolas.",
    icon: ClipboardCheck,
  },
];

const statusHighlights = [
  {
    label: "Perfil",
    value: "Em revisão",
    helper: "2 campos aguardando confirmação",
  },
  {
    label: "Endereços",
    value: "1 principal",
    helper: "Nenhum endereço adicional",
  },
  {
    label: "Listas criadas",
    value: "0",
    helper: "Nenhuma seleção em andamento",
  },
];

/**
 * Displays an authenticated landing page with shared shell, summary cards, and a reusable content state.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <PageShell>
      <PageHeader
        description="Acompanhe as etapas do seu cadastro, revise seus dados e organize a próxima lista de escolas sem sair do fluxo autenticado da aplicação."
        eyebrow="Visão geral"
        title="Painel inicial"
      />

      <PageSection
        description="Os mesmos padrões de shell, seção e card usados aqui podem ser reaproveitados nas demais páginas autenticadas."
        title="Resumo do seu acesso"
      >
        <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
          <PageCard>
            <PageCardHeader
              description="Revise os principais pontos antes de iniciar uma nova seleção."
              title="Próximos passos"
            />
            <PageCardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map(({ title, description, icon: Icon }) => (
                  <div
                    className="rounded-lg border border-border/60 bg-muted/20 p-4"
                    key={title}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h5 className="text-sm font-semibold text-foreground">
                      {title}
                    </h5>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </PageCardContent>
          </PageCard>

          <PageCard>
            <PageCardHeader
              description="Informações rápidas para orientar a próxima ação."
              title="Situação atual"
            />
            <PageCardContent className="space-y-3">
              {statusHighlights.map(({ label, value, helper }) => (
                <div
                  className="rounded-lg border border-border/60 bg-background/80 p-4"
                  key={label}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
                </div>
              ))}
            </PageCardContent>
          </PageCard>
        </div>
      </PageSection>

      <PageSection
        description="Estados completos e reutilizáveis ajudam a manter consistência visual mesmo antes da integração com dados reais."
        title="Acompanhamento da seleção"
      >
        <ContentState
          actions={
            <>
              <Button type="button">Criar nova lista</Button>
              <Button type="button" variant="outline">
                Ver critérios atuais
              </Button>
            </>
          }
          description="Quando você iniciar uma lista de escolas, o andamento, a prévia e os próximos passos serão apresentados aqui dentro do shell compartilhado."
          title="Nenhuma lista iniciada até o momento"
          tone="info"
        >
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <ArrowRight
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              Confirme perfil e endereço antes de criar sua primeira lista.
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              Use critérios claros para comparar as opções disponíveis com mais
              rapidez.
            </li>
          </ul>
        </ContentState>
      </PageSection>
    </PageShell>
  );
}
