import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { asMedia, getArticle, getArticles, richTextParagraphs } from '@/lib/aurea-data'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticle((await params).slug)
  return article ? { title: `${article.title} | Caderno AUREA`, description: article.excerpt } : {}
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug)
  if (!article) notFound()
  const cover = asMedia(article.cover)
  const paragraphs = richTextParagraphs(article.content)
  return <main><article><header className="page-shell pb-14 pt-40 text-center md:pb-20 md:pt-52"><Link href="/blog" className="eyebrow text-black/45">← Caderno</Link><p className="eyebrow mt-12">{article.category} · {article.readingTime}</p><h1 className="mx-auto mt-7 max-w-6xl font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[.9] tracking-[-.04em]">{article.title}</h1><p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/55">{article.excerpt}</p></header>{cover && <div className="relative h-[65svh] min-h-[480px]"><Image src={cover.url!} alt={cover.alt} fill priority sizes="100vw" className="object-cover" /></div>}<div className="mx-auto max-w-3xl px-5 py-20 md:py-28"><p className="eyebrow mb-10 text-black/40">{new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>{paragraphs.map((paragraph, index) => <p key={index} className="mb-7 font-serif text-2xl leading-[1.55] md:text-3xl">{paragraph}</p>)}</div></article></main>
}
