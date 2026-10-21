import type { Metadata } from 'next'
import { PageIntro } from '@/components/Editorial'

export const metadata: Metadata = { title: 'Serviços | AUREA Architecture' }

const services = [
  ['01', 'Arquitetura', 'Projetos residenciais e corporativos completos, da viabilidade ao acompanhamento de obra.', ['Estudo de implantação', 'Projeto legal e executivo', 'Compatibilização técnica', 'Acompanhamento autoral']],
  ['02', 'Interiores', 'Ambientes concebidos como extensão da arquitetura, da distribuição ao último detalhe.', ['Layout e fluxos', 'Materiais e iluminação', 'Marcenaria sob medida', 'Curadoria de mobiliário e arte']],
  ['03', 'Consultoria', 'Orientação precisa para decisões pontuais, imóveis em avaliação ou projetos em andamento.', ['Análise pré-compra', 'Potencial construtivo', 'Diagnóstico de interiores', 'Direção criativa']],
]

export default function ServicesPage() {
  return <main>
    <PageIntro kicker="O que fazemos" title="Serviços" copy="Atuação integrada para transformar intenção em espaços consistentes, funcionais e profundamente pessoais." />
    <section className="page-shell pb-28 md:pb-44">
      {services.map(([number, title, copy, items]) => <article key={number as string} className="grid gap-8 border-t border-black/25 py-10 md:grid-cols-[.2fr_.8fr_1fr] md:py-16">
        <span className="text-xs">{number as string}</span>
        <h2 className="font-serif text-5xl md:text-6xl">{title as string}</h2>
        <div><p className="max-w-xl text-lg leading-8 text-black/60">{copy as string}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{(items as string[]).map((item) => <li key={item} className="border-b border-black/15 pb-3 text-sm">↗ {item}</li>)}</ul></div>
      </article>)}
    </section>
  </main>
}
