import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageIntro } from '@/components/Editorial'
import { asMedia, getArticles } from '@/lib/aurea-data'

export const metadata: Metadata = { title: 'Caderno | AUREA Architecture', description: 'Reflexões sobre arquitetura, interiores, cidade e matéria.' }

export default async function BlogPage() {
  const articles = await getArticles()
  return <main><PageIntro kicker="Caderno AUREA" title="Ideias & matéria" copy="Notas sobre arquitetura, interiores, paisagem e o modo como escolhemos habitar." /><section className="page-shell grid gap-x-8 gap-y-16 pb-28 md:grid-cols-2 md:pb-44">{articles.map((article, index) => { const cover = asMedia(article.cover); return <Link href={`/blog/${article.slug}`} key={article.id} className={`group ${index === 0 ? 'md:col-span-2' : ''}`}>{cover && <div className={`relative overflow-hidden bg-[#ddd6ca] ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}><Image src={cover.url!} alt={cover.alt} fill sizes={index === 0 ? '100vw' : '50vw'} className="object-cover transition duration-700 group-hover:scale-[1.02]" /></div>}<div className="mt-5 flex items-center gap-4 text-[.65rem] uppercase tracking-[.16em] text-black/45"><span>{article.category}</span><span>—</span><span>{article.readingTime}</span></div><h2 className={`mt-3 font-serif leading-tight ${index === 0 ? 'text-5xl md:text-7xl' : 'text-4xl'}`}>{article.title}</h2><p className="mt-4 max-w-xl leading-7 text-black/55">{article.excerpt}</p></Link>})}</section></main>
}
