import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProjectGallery } from '@/components/ProjectGallery'
import { asMedia, getProject, getProjects } from '@/lib/aurea-data'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  const cover = asMedia(project.cover)
  return {
    title: `${project.title} | AUREA Architecture`,
    description: project.summary,
    openGraph: cover?.url ? { images: [cover.url] } : undefined,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  const cover = asMedia(project.cover)
  const gallery = (project.gallery ?? []).flatMap((item) => {
    const media = asMedia(item.image)
    return media ? [{ media, caption: item.caption }] : []
  })

  return (
    <main>
      <section className="page-shell pb-12 pt-40 md:pb-20 md:pt-52">
        <Link href="/projetos" className="eyebrow text-black/45">← Todos os projetos</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="eyebrow mb-6">{project.category} · {project.year}</p><h1 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[.8] tracking-[-.05em]">{project.title}</h1></div>
          <p className="max-w-sm text-lg leading-7 text-black/55">{project.summary}</p>
        </div>
      </section>
      {cover && <div className="relative h-[70svh] min-h-[520px] w-full bg-[#d9d2c6]"><Image src={cover.url!} alt={cover.alt} fill priority sizes="100vw" className="object-cover" /></div>}
      <section className="page-shell grid gap-12 py-24 md:py-36 lg:grid-cols-[.55fr_1fr]">
        <dl className="grid grid-cols-2 content-start gap-y-8 border-t border-black/20 pt-5 text-sm">
          <div><dt className="eyebrow text-black/40">Local</dt><dd className="mt-3">{project.location}</dd></div>
          <div><dt className="eyebrow text-black/40">Área</dt><dd className="mt-3">{project.area}</dd></div>
          <div><dt className="eyebrow text-black/40">Ano</dt><dd className="mt-3">{project.year}</dd></div>
          <div><dt className="eyebrow text-black/40">Escopo</dt><dd className="mt-3">Arquitetura & interiores</dd></div>
        </dl>
        <div><p className="eyebrow">Conceito</p><p className="mt-7 max-w-3xl font-serif text-4xl leading-[1.15] md:text-6xl">{project.concept}</p></div>
      </section>
      <section className="page-shell pb-28 md:pb-44">
        {gallery.length > 0 && <ProjectGallery images={gallery} />}
      </section>
      <section className="bg-[#C5B49C] py-20 text-center md:py-28">
        <p className="eyebrow">Tem um projeto em mente?</p>
        <Link href="/contato" className="mt-6 inline-block font-serif text-5xl md:text-7xl">Conte-nos sobre ele ↗</Link>
      </section>
    </main>
  )
}
