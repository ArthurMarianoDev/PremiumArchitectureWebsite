import type { Access, CollectionConfig } from 'payload'

const isAdmin: Access = ({ req }) => req.user?.collection === 'admins'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Solicitação', plural: 'Solicitações' },
  access: {
    create: () => true,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    group: 'Relacionamento',
    useAsTitle: 'name',
    defaultColumns: ['name', 'projectType', 'city', 'createdAt', 'status'],
  },
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'phone', label: 'Telefone', type: 'text', required: true },
    {
      name: 'projectType',
      label: 'Tipo de projeto',
      type: 'select',
      required: true,
      options: ['residencial', 'comercial', 'interiores', 'consultoria'],
    },
    { name: 'area', label: 'Metragem estimada', type: 'number', required: true, min: 10, max: 100000 },
    { name: 'city', label: 'Cidade', type: 'text', required: true },
    {
      name: 'investment',
      label: 'Faixa de investimento',
      type: 'select',
      required: true,
      options: ['ate-300k', '300k-700k', '700k-1.5m', 'acima-1.5m'],
    },
    { name: 'message', label: 'Contexto', type: 'textarea', required: true },
    { name: 'consent', label: 'Consentimento LGPD', type: 'checkbox', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'novo',
      access: {
        create: ({ req }) => req.user?.collection === 'admins',
        update: ({ req }) => req.user?.collection === 'admins',
      },
      options: ['novo', 'em-contato', 'qualificado', 'arquivado'],
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins',
      },
    },
  ],
}
