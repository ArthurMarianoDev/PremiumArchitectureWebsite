import Link from 'next/link'

export function SiteFooter() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511987654321'

  return (
    <footer className="bg-[#202020] px-5 pb-8 pt-20 text-[#F5F2EB] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-[#C5B49C]">Comece uma conversa</p>
            <Link href="/contato" className="mt-5 block max-w-2xl font-serif text-5xl leading-[0.98] md:text-7xl">
              Vamos imaginar o seu próximo espaço.
            </Link>
          </div>
          <div className="text-sm leading-7 text-white/65">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white">São Paulo</p>
            <p>Alameda Santos, 1.800</p>
            <p>São Paulo — SP</p>
            <a href="mailto:studio@aurea.archi" className="mt-5 inline-block text-white">studio@aurea.archi</a>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm text-white/65">
            <Link href="/projetos">Projetos</Link>
            <Link href="/sobre">Escritório</Link>
            <Link href="/blog">Caderno</Link>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <Link href="/admin" className="mt-3 text-[#C5B49C]">Acesso CMS</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[0.65rem] uppercase tracking-[0.15em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AUREA Architecture</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/termos">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
