import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export type MediaAsset = {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
}

export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      depth: 2,
      limit: 100,
      overrideAccess: false,
      sort: '-year',
    })
    return result.docs
  },
  ['aurea-projects'],
  { tags: ['projects'] },
)

export async function getProject(slug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'projects',
        depth: 2,
        limit: 1,
        overrideAccess: false,
        where: { slug: { equals: slug } },
      })
      return result.docs[0] ?? null
    },
    ['aurea-project', slug],
    { tags: ['projects', `project:${slug}`] },
  )()
}

export const getArticles = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      depth: 2,
      limit: 100,
      overrideAccess: false,
      sort: '-publishedAt',
    })
    return result.docs
  },
  ['aurea-articles'],
  { tags: ['articles'] },
)

export async function getArticle(slug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'articles',
        depth: 2,
        limit: 1,
        overrideAccess: false,
        where: { slug: { equals: slug } },
      })
      return result.docs[0] ?? null
    },
    ['aurea-article', slug],
    { tags: ['articles', `article:${slug}`] },
  )()
}

export function asMedia(value: unknown): MediaAsset | null {
  if (!value || typeof value === 'string') return null
  const media = value as Partial<MediaAsset>
  if (!media.url || !media.alt) return null
  return media as MediaAsset
}

export function richTextParagraphs(value: unknown): string[] {
  const root = (value as { root?: { children?: unknown[] } } | null)?.root
  if (!root?.children) return []

  const readText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const item = node as { text?: string; children?: unknown[] }
    if (typeof item.text === 'string') return item.text
    return item.children?.map(readText).join('') ?? ''
  }

  return root.children.map(readText).filter(Boolean)
}
