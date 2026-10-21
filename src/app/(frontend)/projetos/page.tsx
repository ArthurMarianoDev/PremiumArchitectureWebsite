import type { Metadata } from 'next'
import { PageIntro } from '@/components/Editorial'
import { ProjectsFilter } from '@/components/ProjectsFilter'
import { getProjects } from '@/lib/aurea-data'

export const metadata: Metadata = {
  title: 'Projetos | AUREA Architecture',
  description: 'Projetos residenciais, comerciais e de interiores desenvolvidos pela AUREA Architecture.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <main>
      <PageIntro kicker="Portfólio / 2019—2026" title="Projetos" copy="Uma seleção de espaços desenhados a partir do lugar, da matéria e da vida que acontece entre eles." />
      <section className="page-shell pb-28 md:pb-44">
        {projects.length ? <ProjectsFilter projects={projects} /> : <p className="border-y border-black/20 py-14 text-black/55">Novos projetos serão publicados em breve.</p>}
      </section>
    </main>
  )
}
