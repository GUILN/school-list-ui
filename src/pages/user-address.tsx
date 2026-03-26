import { Button } from "@/components/ui/button";
import { ContentState } from "@/components/ui/content-state";
import { Input } from "@/components/ui/input";
import {
  PageCard,
  PageCardContent,
  PageCardHeader,
  PageHeader,
  PageSection,
  PageShell,
} from "@/components/ui/page-shell";

const addressFields = [
  { label: "CEP", value: "01000-000" },
  { label: "Cidade", value: "São Paulo" },
  { label: "Endereço", value: "Rua das Flores, 245" },
  { label: "Complemento", value: "Apto 32" },
];

/**
 * Displays the address management page using the shared routed-page shell and full content states.
 */
export default function UserAddressPage(): React.JSX.Element {
  return (
    <PageShell>
      <PageHeader
        actions={
          <Button type="button" variant="outline">
            Adicionar endereço
          </Button>
        }
        description="Gerencie o endereço principal usado como referência na sua inscrição e prepare espaço para endereços complementares."
        eyebrow="Localização"
        title="Endereços"
      />

      <PageSection
        description="O conteúdo mantém largura controlada, boa legibilidade e o mesmo padrão visual das demais telas."
        title="Endereço principal"
      >
        <PageCard>
          <PageCardHeader
            action={
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Principal
              </span>
            }
            description="Endereço considerado padrão para comunicação e validações da inscrição."
            title="Cadastro atual"
          />
          <PageCardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {addressFields.map(({ label, value }) => (
                <label className="space-y-2" key={label}>
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <Input aria-label={label} defaultValue={value} readOnly />
                </label>
              ))}
            </div>
          </PageCardContent>
        </PageCard>
      </PageSection>

      <PageSection
        description="Use estados completos para orientar a ação do usuário sem depender de integrações futuras."
        title="Endereços adicionais"
      >
        <ContentState
          actions={
            <Button type="button">Cadastrar endereço complementar</Button>
          }
          description="Você ainda não adicionou um endereço alternativo. Cadastre outro local apenas se ele for necessário para apoiar o processo de seleção."
          title="Nenhum endereço adicional cadastrado"
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Utilize um endereço alternativo apenas quando houver
              justificativa no processo.
            </p>
            <p>
              • Mantenha o endereço principal sempre atualizado antes de criar
              novas listas.
            </p>
          </div>
        </ContentState>
      </PageSection>
    </PageShell>
  );
}
