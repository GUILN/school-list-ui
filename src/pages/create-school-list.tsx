import { Button } from "@/components/ui/button";
import { ContentState } from "@/components/ui/content-state";
import { Input } from "@/components/ui/input";
import {
  PageCard,
  PageCardContent,
  PageCardFooter,
  PageCardHeader,
  PageHeader,
  PageSection,
  PageShell,
} from "@/components/ui/page-shell";

const filterTags = ["Ensino Fundamental", "Turno integral", "Até 5 km"];

/**
 * Displays the school-list creation page with reusable shell primitives and future-ready content states.
 */
export default function CreateSchoolListPage(): React.JSX.Element {
  return (
    <PageShell>
      <PageHeader
        actions={
          <>
            <Button type="button" variant="outline">
              Limpar filtros
            </Button>
            <Button type="button">Gerar prévia</Button>
          </>
        }
        description="Defina critérios iniciais para montar uma lista de escolas com a mesma base visual e estrutural usada nas demais páginas autenticadas."
        eyebrow="Configuração"
        title="Criar lista de escolas"
      />

      <PageSection
        description="A estrutura abaixo está pronta para receber opções dinâmicas e validações sem precisar duplicar markup entre telas."
        title="Critérios iniciais"
      >
        <PageCard>
          <PageCardHeader
            description="Use filtros iniciais para preparar a próxima geração da lista."
            title="Preferências de busca"
          />
          <PageCardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Nome da lista
                </span>
                <Input
                  aria-label="Nome da lista"
                  defaultValue="Lista prioritária 2025"
                  readOnly
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Região de interesse
                </span>
                <Input
                  aria-label="Região de interesse"
                  defaultValue="Zona Norte"
                  readOnly
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filterTags.map((tag) => (
                <span
                  className="inline-flex rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </PageCardContent>
          <PageCardFooter>
            <p className="text-sm text-muted-foreground">
              Ajuste os filtros antes de gerar uma prévia para impressão.
            </p>
            <Button type="button" variant="secondary">
              Salvar rascunho
            </Button>
          </PageCardFooter>
        </PageCard>
      </PageSection>

      <PageSection
        description="Os estados de conteúdo completos já antecipam como a página vai se comportar quando não houver resultados ou prévias disponíveis."
        title="Prévia da lista"
      >
        <ContentState
          actions={
            <>
              <Button type="button">Gerar prévia</Button>
              <Button type="button" variant="outline">
                Revisar filtros
              </Button>
            </>
          }
          description="Defina os critérios da busca para visualizar as escolas sugeridas antes de avançar para a etapa de impressão."
          title="A prévia da lista aparecerá aqui"
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Revise região, modalidade e distância máxima.</li>
            <li>
              • Compare diferentes combinações de filtros antes de salvar a
              seleção final.
            </li>
          </ul>
        </ContentState>
      </PageSection>
    </PageShell>
  );
}
