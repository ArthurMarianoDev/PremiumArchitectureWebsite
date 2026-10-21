import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Privacidade | AUREA Architecture' }

export default function PrivacyPage() {
  return <LegalPage title="Privacidade" updated="21 de outubro de 2026">
    <h2>Dados que tratamos</h2><p>Ao solicitar um orçamento, coletamos nome, e-mail, telefone, cidade, tipo e metragem do projeto, faixa de investimento e a mensagem enviada. Não solicitamos endereço residencial preciso, documentos pessoais ou dados financeiros nesta etapa.</p>
    <h2>Finalidade e base legal</h2><p>Usamos esses dados exclusivamente para analisar a solicitação, responder ao contato e, quando houver interesse mútuo, preparar uma proposta. O tratamento se baseia no seu consentimento e em procedimentos preliminares relacionados a um possível contrato.</p>
    <h2>Retenção real</h2><p>Leads sem contratação são mantidos por até 24 meses após o último contato e então excluídos ou anonimizados. Registros vinculados a contratos seguem os prazos legais aplicáveis. Você pode solicitar acesso, correção ou exclusão pelo e-mail studio@aurea.archi.</p>
    <h2>Fornecedores e compartilhamento</h2><p>Os registros do site e do CMS são processados na infraestrutura Figma Make e Payload Cloud. Fotografias editoriais iniciais são licenciadas pelo Unsplash. O WhatsApp, da Meta, somente recebe dados quando você decide iniciar uma conversa pelo link externo. Não vendemos dados pessoais.</p>
    <h2>Projetos e fotografias</h2><p>Projetos identificáveis somente são publicados mediante autorização documentada do cliente. O escritório omite endereços residenciais precisos e revisa imagens para remover metadados de localização quando aplicável. Uploads do CMS são restritos a usuários autorizados.</p>
    <h2>Segurança</h2><p>Aplicamos validação no servidor, limite de solicitações, campo antispam e controles de acesso no CMS. Nenhum sistema é infalível; incidentes relevantes serão tratados e comunicados conforme a legislação.</p>
  </LegalPage>
}
