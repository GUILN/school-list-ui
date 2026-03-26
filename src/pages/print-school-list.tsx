import { Button } from "@/components/ui/button";
import { ContentState } from "@/components/ui/content-state";
import {
  PageCard,
  PageCardContent,
  PageCardHeader,
  PageHeader,
  PageSection,
  PageShell,
} from "@/components/ui/page-shell";
import { FileSpreadsheet, Printer } from "lucide-react";

const printOptions = [
  { label: "Formato", value: "A4 retrato" },
  { label: "Ordenação", value: "Prioridade da seleção" },
  { label: "Itens por página", value: "10 escolas" },
];

/**
 * Displays the print preparation page with shared shell components and reusable full content states.
 */
export default function PrintSchoolListPage(): React.JSX.Element {
  return (
    <PageShell>
      <PageHeader
        actions={
          <>
            <Button type="button" variant="outline">
              Exportar PDF
            </Button>
            <Button type="button">Preparar impressão</Button>
          </>
        }
        description="Organize o layout final da sua lista e mantenha a experiência alinhada com o restante do shell autenticado."
        eyebrow="Saída"
        title="Imprimir lista de escolas"
      />

      <PageSection
        description="O card abaixo demonstra como opções de impressão podem ocupar uma superfície sutil e consistente."
        title="Configurações de impressão"
      >
        <PageCard>
          <PageCardHeader
            action={
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Printer aria-hidden="true" className="h-3.5 w-3.5" />
                Preparação manual
              </div>
            }
            description="Revise as preferências antes de gerar o arquivo final."
            title="Layout final"
          />
          <PageCardContent className="space-y-3">
            {printOptions.map(({ label, value }) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/80 p-4"
                key={label}
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {label}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {value}
                </span>
              </div>
            ))}
          </PageCardContent>
        </PageCard>
      </PageSection>

      <PageSection
        description="Um estado de conteúdo completo deixa claro o que falta para concluir a jornada de impressão."
        title="Status da geração"
      >
        <ContentState
          actions={
            <>
              <Button type="button">Ir para criação da lista</Button>
              <Button type="button" variant="outline">
                Revisar opções
              </Button>
            </>
          }
          description="Ainda não existe uma lista pronta para impressão. Gere ou revise uma lista de escolas antes de exportar o documento final."
          icon={FileSpreadsheet}
          title="Nenhuma lista pronta para impressão"
          tone="warning"
        >
          <p className="text-sm text-muted-foreground">
            Assim que uma lista for confirmada, esta área exibirá a prévia do
            documento, as opções de exportação e o histórico de versões.
          </p>
        </ContentState>
      </PageSection>
    </PageShell>
  );
}
