import Image from 'next/image'
import Link from 'next/link'
import type { MediaAsset } from '@/lib/aurea-data'

export function MediaImage({
  media,
  className = '',
  sizes = '100vw',
  priority = false,
}: {
  media: MediaAsset
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <Image
      src={media.url!}
      alt={media.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  )
}

export function PageIntro({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <section className="page-shell pb-14 pt-40 md:pb-24 md:pt-52">
      <p className="eyebrow">{kicker}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <h1 className="max-w-5xl font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-[-0.045em]">{title}</h1>
        {copy && <p className="max-w-md text-base leading-7 text-black/60 md:text-lg">{copy}</p>}
      </div>
    </section>
  )
}

export function ProjectCard({ project, index }: { project: any; index: number }) {
  const cover = typeof project.cover === 'object' ? project.cover as MediaAsset : null
  if (!cover?.url) return null
  return (
    <Link href={`/projetos/${project.slug}`} className="project-card group block">
      <div className={`relative overflow-hidden bg-[#ded8cc] ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-[5/4]' : 'aspect-[3/4]'}`}>
        <MediaImage media={cover} sizes="(max-width: 768px) 100vw, 50vw" className="transition duration-700 group-hover:scale-[1.025]" />
        <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F2EB] text-lg opacity-0 transition duration-300 group-hover:opacity-100">↗</span>
      </div>
      <div className="flex items-start justify-between gap-5 border-b border-black/20 py-5">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">{project.title}</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/50">{project.location}</p>
        </div>
        <p className="pt-2 text-[0.65rem] uppercase tracking-[0.16em]">{project.category} · {project.year}</p>
      </div>
    </Link>
  )
}
