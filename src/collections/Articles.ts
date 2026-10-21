import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'admins'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Artigo', plural: 'Artigos' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidateTag('articles', 'max')
        revalidateTag(`article:${doc.slug}`, 'max')
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidateTag(`article:${previousDoc.slug}`, 'max')
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag('articles', 'max')
        revalidateTag(`article:${doc.slug}`, 'max')
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', label: 'Resumo', type: 'textarea', required: true },
    { name: 'category', label: 'Categoria', type: 'text', required: true },
    { name: 'publishedAt', label: 'Publicado em', type: 'date', required: true },
    { name: 'readingTime', label: 'Tempo de leitura', type: 'text', required: true },
    { name: 'cover', label: 'Imagem de capa', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', label: 'Conteúdo', type: 'richText', required: true },
  ],
}
