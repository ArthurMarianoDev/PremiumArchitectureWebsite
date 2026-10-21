import type { MetadataRoute } from 'next'
import { getArticles, getProjects } from '@/lib/aurea-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const [projects, articles] = await Promise.all([getProjects(), getArticles()])
  const fixed = ['', '/projetos', '/servicos', '/sobre', '/processo', '/contato', '/blog', '/privacidade', '/cookies', '/termos']
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...projects.map((project) => ({ url: `${base}/projetos/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...articles.map((article) => ({ url: `${base}/blog/${article.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
