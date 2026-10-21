import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'admins'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidateTag('projects', 'max')
        revalidateTag(`project:${doc.slug}`, 'max')
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidateTag(`project:${previousDoc.slug}`, 'max')
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag('projects', 'max')
        revalidateTag(`project:${doc.slug}`, 'max')
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      required: true,
      options: [
        { label: 'Residencial', value: 'residencial' },
        { label: 'Comercial', value: 'comercial' },
        { label: 'Interiores', value: 'interiores' },
      ],
    },
    { name: 'location', label: 'Localização aproximada', type: 'text', required: true },
    { name: 'area', label: 'Área', type: 'text', required: true },
    { name: 'year', label: 'Ano', type: 'number', required: true },
    { name: 'summary', label: 'Resumo', type: 'textarea', required: true },
    { name: 'concept', label: 'Conceito', type: 'textarea', required: true },
    { name: 'featured', label: 'Destaque', type: 'checkbox', defaultValue: false },
    {
      name: 'cover',
      label: 'Imagem de capa',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Galeria',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Imagem',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'caption', label: 'Legenda', type: 'text' },
      ],
    },
  ],
}
