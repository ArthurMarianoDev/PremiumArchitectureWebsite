import type { Metadata } from 'next'
import { QuoteForm } from '@/components/QuoteForm'
import { PageIntro } from '@/components/Editorial'

export const metadata: Metadata = { title: 'Contato e orçamento | AUREA Architecture', description: 'Conte à AUREA sobre seu projeto de arquitetura ou interiores.' }

export default function ContactPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511987654321'
  return <main><PageIntro kicker="Inicie um projeto" title="Vamos conversar." copy="Conte-nos sobre o espaço que deseja criar. Analisamos cada solicitação pessoalmente e retornamos em até dois dias úteis." /><section className="page-shell grid gap-16 pb-28 md:pb-44 lg:grid-cols-[.55fr_1fr]"><aside className="space-y-8 text-sm leading-7"><div><p className="eyebrow text-black/40">Contato direto</p><a href="mailto:studio@aurea.archi" className="mt-3 block">studio@aurea.archi</a><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="block">WhatsApp ↗</a></div><div><p className="eyebrow text-black/40">Atendimento</p><p className="mt-3">Brasil e projetos internacionais<br />Seg—Sex · 9h—18h</p></div><p className="max-w-xs text-xs leading-5 text-black/40">Nunca envie documentos sensíveis ou endereços residenciais completos por este formulário. Solicitaremos informações detalhadas somente em ambiente apropriado.</p></aside><QuoteForm /></section></main>
}
