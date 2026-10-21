'use client'

import { useState } from 'react'
import { ProjectCard } from './Editorial'

const filters = [
  ['todos', 'Todos'],
  ['residencial', 'Residencial'],
  ['comercial', 'Comercial'],
  ['interiores', 'Interiores'],
] as const

export function ProjectsFilter({ projects }: { projects: any[] }) {
  const [active, setActive] = useState('todos')
  const filtered = active === 'todos' ? projects : projects.filter((project) => project.category === active)

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-y border-black/20 py-5">
        {filters.map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => setActive(value)}
            className={`text-xs uppercase tracking-[0.17em] transition ${active === value ? 'text-black underline underline-offset-8' : 'text-black/45 hover:text-black'}`}
          >
            {label} <sup>{value === 'todos' ? projects.length : projects.filter((p) => p.category === value).length}</sup>
          </button>
        ))}
      </div>
      <div className="grid items-start gap-x-7 gap-y-16 md:grid-cols-2">
        {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </>
  )
}
