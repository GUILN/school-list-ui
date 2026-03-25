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

const profileFields = [
  { label: "Nome completo", value: "Ana Souza Pereira" },
  { label: "CPF", value: "123.456.789-00" },
  { label: "E-mail", value: "ana.souza@email.com" },
  { label: "Telefone", value: "(11) 99999-0000" },
];

/**
 * Displays the user profile page with shared section/card patterns and reusable profile status messaging.
 */
export default function UserProfilePage(): React.JSX.Element {
  return (
    <PageShell>
      <PageHeader
        actions={
          <>
            <Button type="button" variant="outline">
              Revisar documentos
            </Button>
            <Button type="button">Salvar alterações</Button>
          </>
        }
        description="Mantenha seus dados pessoais atualizados para garantir que a criação e a impressão da lista utilizem informações consistentes."
        eyebrow="Cadastro"
        title="Meu perfil"
      />

      <PageSection
        description="Os campos abaixo apresentam uma estrutura pronta para futura integração com dados persistidos."
        title="Dados principais"
      >
        <PageCard>
          <PageCardHeader
            description="Informações essenciais usadas na identificação da sua inscrição."
            title="Identificação do usuário"
          />
          <PageCardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {profileFields.map(({ label, value }) => (
                <label className="space-y-2" key={label}>
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <Input aria-label={label} defaultValue={value} readOnly />
                </label>
              ))}
            </div>
          </PageCardContent>
          <PageCardFooter>
            <p className="text-sm text-muted-foreground">
              Dados pessoais e de contato devem permanecer alinhados com a
              documentação enviada.
            </p>
            <Button type="button" variant="secondary">
              Solicitar atualização
            </Button>
          </PageCardFooter>
        </PageCard>
      </PageSection>

      <PageSection
        description="Estados completos evitam placeholders frágeis e podem ser compartilhados entre outras páginas autenticadas."
        title="Situação do cadastro"
      >
        <ContentState
          actions={
            <Button type="button" variant="outline">
              Ver pendências
            </Button>
          }
          description="Seu perfil está quase pronto. Falta apenas revisar os dados de contato e confirmar a consistência entre documento e cadastro."
          title="Confirmação de dados pendente"
          tone="info"
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Revise telefone e e-mail para receber atualizações da seleção.
            </li>
            <li>
              • Mantenha CPF e nome exatamente como constam no documento
              oficial.
            </li>
          </ul>
        </ContentState>
      </PageSection>
    </PageShell>
  );
}
