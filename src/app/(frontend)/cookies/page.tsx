import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Cookies | AUREA Architecture' }

export default function CookiesPage() {
  return <LegalPage title="Cookies" updated="21 de outubro de 2026">
    <h2>Uso atual</h2><p>O site utiliza cookies estritamente necessários para segurança, funcionamento do painel administrativo e estabilidade da navegação. Eles não são usados para criar perfis publicitários.</p>
    <h2>Medição de audiência</h2><p>O Google Analytics só é carregado quando um identificador é configurado pelo administrador do site. Quando ativo, a AUREA deve exibir o mecanismo de consentimento correspondente antes da coleta não essencial. Na configuração inicial, nenhuma ferramenta de marketing está ativa.</p>
    <h2>Links externos</h2><p>Ao abrir WhatsApp ou outras plataformas externas, esses serviços podem definir seus próprios cookies conforme as políticas deles. Você pode bloquear cookies nas configurações do navegador, embora funções essenciais possam ser afetadas.</p>
  </LegalPage>
}
