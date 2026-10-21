export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main>
      <header className="page-shell pb-16 pt-40 md:pt-52">
        <p className="eyebrow">Informações legais</p>
        <h1 className="mt-7 font-serif text-6xl md:text-8xl">{title}</h1>
        <p className="mt-5 text-sm text-black/45">Última atualização: {updated}</p>
      </header>
      <article className="page-shell grid gap-12 pb-28 md:grid-cols-[.35fr_1fr] md:pb-44">
        <p className="eyebrow text-black/40">AUREA Architecture</p>
        <div className="legal-copy max-w-3xl">{children}</div>
      </article>
    </main>
  )
}
