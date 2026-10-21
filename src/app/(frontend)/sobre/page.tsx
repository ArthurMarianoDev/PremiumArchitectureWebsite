import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro } from '@/components/Editorial'
import { asMedia, getProjects } from '@/lib/aurea-data'

export const metadata: Metadata = { title: 'Sobre | AUREA Architecture' }

export default async function AboutPage() {
  const projects = await getProjects()
  const image = asMedia(projects.find((project) => project.slug === 'pavilhao-norte')?.gallery?.[0]?.image)
  return <main>
    <PageIntro kicker="O escritório" title="Sobre" copy="Um estúdio multidisciplinar de São Paulo dedicado à arquitetura que equilibra inteligência, sensibilidade e permanência." />
    <section className="page-shell grid gap-6 pb-24 md:grid-cols-[1.3fr_.7fr] md:pb-36">
      <div className="relative min-h-[520px] bg-[#ddd6ca]">{image && <Image src={image.url!} alt={image.alt} fill sizes="70vw" className="object-cover" />}</div>
      <div className="flex flex-col justify-between bg-[#C5B49C] p-8 md:p-12"><p className="eyebrow">Desde 2013</p><p className="font-serif text-4xl leading-tight md:text-5xl">“Nosso trabalho começa quando a arquitetura deixa de ser objeto e passa a ser experiência.”</p></div>
    </section>
    <section className="page-shell grid gap-14 pb-28 md:grid-cols-[.5fr_1fr] md:pb-44">
      <p className="eyebrow">Princípios</p>
      <div className="grid gap-12 md:grid-cols-2">
        {['Escuta antes do traço', 'Contexto como fundamento', 'Detalhe como linguagem', 'Responsabilidade como prática'].map((item, index) => <div key={item} className="border-t border-black/20 pt-5"><span className="text-xs text-black/40">0{index + 1}</span><h2 className="mt-10 font-serif text-4xl">{item}</h2><p className="mt-4 leading-7 text-black/55">Decisões claras, materiais honestos e diálogo próximo orientam cada etapa do trabalho.</p></div>)}
      </div>
    </section>
    <section className="bg-[#202020] text-[#F5F2EB]"><div className="page-shell py-24 md:py-36"><p className="eyebrow text-[#C5B49C]">Equipe</p><h2 className="mt-6 max-w-4xl font-serif text-5xl md:text-7xl">Diferentes olhares, uma mesma busca por precisão.</h2><div className="mt-16 grid gap-8 sm:grid-cols-3">{[['Marina Avelar','Sócia-fundadora · Arquitetura'],['Rafael Uehara','Sócio · Interiores'],['Clara Nunes','Diretora de projetos']].map(([name, role], i) => <div key={name} className="border-t border-white/20 pt-5"><span className="text-xs text-white/40">0{i+1}</span><h3 className="mt-12 font-serif text-3xl">{name}</h3><p className="mt-2 text-xs uppercase tracking-[.15em] text-white/45">{role}</p></div>)}</div></div></section>
  </main>
}
