import type { Metadata } from 'next'
import { PageIntro } from '@/components/Editorial'

export const metadata: Metadata = { title: 'Processo | AUREA Architecture' }

const steps = [
  ['01', 'Imersão', 'Escutamos sua história, investigamos o lugar e organizamos prioridades, limites e desejos.'],
  ['02', 'Conceito', 'Definimos a ideia central, os fluxos, a atmosfera e os princípios que guiarão todas as decisões.'],
  ['03', 'Desenvolvimento', 'Aprofundamos arquitetura, interiores, materiais e sistemas em diálogo com consultores.'],
  ['04', 'Documentação', 'Produzimos um conjunto executivo rigoroso, compatibilizado e preparado para orçamento.'],
  ['05', 'Realização', 'Acompanhamos fornecedores e obra para preservar a intenção até o último detalhe.'],
]

export default function ProcessPage() {
  return <main><PageIntro kicker="Como trabalhamos" title="Processo" copy="Um percurso transparente, colaborativo e rigoroso — da primeira conversa à entrega do espaço." /><section className="page-shell pb-28 md:pb-44">{steps.map(([n,title,copy]) => <article key={n} className="group grid gap-8 border-t border-black/25 py-10 md:grid-cols-[.2fr_.8fr_1fr] md:py-14"><span className="text-xs">{n}</span><h2 className="font-serif text-5xl transition group-hover:translate-x-2 md:text-6xl">{title}</h2><p className="max-w-xl self-center text-lg leading-8 text-black/55">{copy}</p></article>)}</section><section className="bg-[#C5B49C]"><div className="page-shell grid gap-10 py-20 md:grid-cols-3 md:py-28"><p className="eyebrow">Transparência</p><p className="font-serif text-4xl md:col-span-2 md:text-6xl">Cada etapa tem entregáveis, decisões e próximos passos claros. Você participa do processo sem carregar a complexidade dele.</p></div></section></main>
}
