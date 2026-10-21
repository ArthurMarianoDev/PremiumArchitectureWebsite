import Image from 'next/image'
import Link from 'next/link'
import { ProjectCard } from '@/components/Editorial'
import { asMedia, getArticles, getProjects } from '@/lib/aurea-data'

export default async function HomePage() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()])
  const hero = asMedia(projects[0]?.cover)

  return (
    <main>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#202020] text-[#F5F2EB]">
        {hero && <Image src={hero.url!} alt={hero.alt} fill priority sizes="100vw" className="object-cover opacity-70" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
        <div className="page-shell relative flex min-h-[100svh] flex-col justify-end pb-9 pt-32 md:pb-12">
          <p className="eyebrow mb-7 text-white/75">Arquitetura & interiores · São Paulo</p>
          <h1 className="max-w-6xl font-serif text-[clamp(4.7rem,12vw,12rem)] leading-[0.74] tracking-[-0.055em]">
            Espaços com <em className="font-light">presença.</em>
          </h1>
          <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/30 pt-5 text-sm text-white/75 md:flex-row">
            <p className="max-w-sm">Arquitetura essencial, matéria honesta e experiências desenhadas para permanecer.</p>
            <Link href="/projetos" className="link-arrow text-white">Conheça nossos projetos <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-12 py-24 md:py-40 lg:grid-cols-[0.55fr_1fr]">
        <div>
          <p className="eyebrow">Manifesto</p>
          <p className="mt-4 text-xs text-black/45">AUREA / 2013—2026</p>
        </div>
        <div>
          <h2 className="max-w-4xl font-serif text-5xl leading-[1.03] md:text-7xl">
            Projetamos lugares que revelam a beleza do essencial e atravessam o tempo.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <p className="leading-7 text-black/60">Cada projeto nasce da escuta: do lugar, das pessoas e da vida que acontecerá ali. Trabalhamos entre arquitetura, interiores e design para criar ambientes completos.</p>
            <p className="leading-7 text-black/60">Nossa linguagem é serena e precisa. Luz natural, proporção e matéria constroem espaços que não dependem de excessos para serem memoráveis.</p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-28 md:pb-44">
        <div className="mb-12 flex items-end justify-between border-b border-black/20 pb-5">
          <div><p className="eyebrow">Projetos selecionados</p><h2 className="mt-4 font-serif text-5xl md:text-7xl">Obras recentes</h2></div>
          <Link href="/projetos" className="link-arrow hidden md:flex">Ver todos <span>↗</span></Link>
        </div>
        <div className="grid items-start gap-x-7 gap-y-16 md:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </section>

      <section className="bg-[#C5B49C]">
        <div className="page-shell grid gap-14 py-24 md:py-36 lg:grid-cols-[0.65fr_1.35fr]">
          <p className="eyebrow">Nossa abordagem</p>
          <div>
            <h2 className="font-serif text-5xl leading-none md:text-8xl">Rigor no processo.<br /><em>Leveza no resultado.</em></h2>
            <div className="mt-14 grid gap-7 sm:grid-cols-3">
              {[['01', 'Escuta', 'Entendemos contexto, desejos e possibilidades antes de desenhar.'], ['02', 'Síntese', 'Transformamos complexidade em decisões claras e coerentes.'], ['03', 'Permanência', 'Projetamos para que cada escolha ganhe valor com o tempo.']].map(([n, title, copy]) => (
                <div key={n} className="border-t border-black/30 pt-5"><span className="text-xs">{n}</span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-black/60">{copy}</p></div>
              ))}
            </div>
            <Link href="/processo" className="link-arrow mt-12">Conheça o processo <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-36">
        <div className="mb-12 flex items-end justify-between">
          <div><p className="eyebrow">Caderno AUREA</p><h2 className="mt-4 font-serif text-5xl md:text-7xl">Ideias & matéria</h2></div>
          <Link href="/blog" className="link-arrow hidden md:flex">Ver caderno <span>↗</span></Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => {
            const cover = asMedia(article.cover)
            return <Link href={`/blog/${article.slug}`} key={article.id} className="group">
              {cover && <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd6ca]"><Image src={cover.url!} alt={cover.alt} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /></div>}
              <p className="mt-5 text-[0.65rem] uppercase tracking-[0.16em] text-black/45">{article.category} · {article.readingTime}</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight">{article.title}</h3>
            </Link>
          })}
        </div>
      </section>
    </main>
  )
}
