'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  ['Projetos', '/projetos'],
  ['Serviços', '/servicos'],
  ['Sobre', '/sobre'],
  ['Processo', '/processo'],
  ['Caderno', '/blog'],
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#202020]/90 text-[#F5F2EB] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:h-24 md:px-10">
        <Link href="/" className="relative z-10 font-serif text-[1.65rem] tracking-[0.12em]" aria-label="AUREA — início">
          AUREA
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
          <Link href="/contato" className="border border-[#C5B49C] px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition hover:bg-[#C5B49C] hover:text-[#202020]">
            Iniciar projeto
          </Link>
        </nav>
        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className={`absolute h-px w-6 bg-current transition ${open ? 'rotate-45' : '-translate-y-1'}`} />
          <span className={`absolute h-px w-6 bg-current transition ${open ? '-rotate-45' : 'translate-y-1'}`} />
        </button>
      </div>
      <div className={`absolute inset-x-0 top-0 min-h-screen bg-[#202020] px-6 pt-32 transition duration-500 lg:hidden ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="flex flex-col border-t border-white/15">
          {links.map(([label, href], index) => (
            <Link onClick={() => setOpen(false)} key={href} href={href} className="flex items-center justify-between border-b border-white/15 py-5 font-serif text-4xl">
              {label}<span className="font-sans text-xs text-[#C5B49C]">0{index + 1}</span>
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/contato" className="mt-8 bg-[#C5B49C] px-5 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#202020]">
            Solicitar orçamento
          </Link>
        </nav>
      </div>
    </header>
  )
}
