import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Termos de uso | AUREA Architecture' }

export default function TermsPage() {
  return <LegalPage title="Termos de uso" updated="21 de outubro de 2026">
    <h2>Natureza do site</h2><p>A AUREA Architecture é uma marca fictícia criada para este projeto demonstrativo. Conteúdos, equipe, endereço e projetos apresentados têm finalidade ilustrativa e não constituem oferta comercial real.</p>
    <h2>Conteúdo e autoria</h2><p>Textos, identidade e composição visual não podem ser reproduzidos como se fossem trabalhos reais do escritório. Fotografias são provenientes do Unsplash e permanecem sujeitas à licença e aos créditos de seus autores.</p>
    <h2>Orçamentos</h2><p>O envio do formulário não cria relação contratual. Em um cenário real, escopo, honorários, prazos, responsabilidades e autorização de publicação seriam formalizados por instrumento específico.</p>
    <h2>Disponibilidade</h2><p>Buscamos manter as informações corretas e o serviço disponível, mas podemos atualizar conteúdo, funcionalidades ou estes termos sem aviso prévio.</p>
  </LegalPage>
}
