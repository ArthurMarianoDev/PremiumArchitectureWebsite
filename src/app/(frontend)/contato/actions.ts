'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

export type QuoteState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

const attempts = new Map<string, number[]>()
const allowedTypes = ['residencial', 'comercial', 'interiores', 'consultoria']
const allowedInvestment = ['ate-300k', '300k-700k', '700k-1.5m', 'acima-1.5m']

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

export async function submitQuote(_: QuoteState, formData: FormData): Promise<QuoteState> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')?.split(',')[0]?.trim()
  const key = forwarded || headerList.get('x-real-ip') || 'anonymous'
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < 10 * 60 * 1000)
  if (recent.length >= 4) {
    return { success: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
  }
  attempts.set(key, [...recent, now])

  if (text(formData, 'companyWebsite')) {
    return { success: true, message: 'Recebemos sua solicitação.' }
  }

  const values = {
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    phone: text(formData, 'phone'),
    projectType: text(formData, 'projectType'),
    area: Number(text(formData, 'area')),
    city: text(formData, 'city'),
    investment: text(formData, 'investment'),
    message: text(formData, 'message'),
    consent: formData.get('consent') === 'on',
  }

  const errors: Record<string, string> = {}
  if (values.name.length < 2 || values.name.length > 100) errors.name = 'Informe seu nome completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 180) errors.email = 'Informe um e-mail válido.'
  if (!/^[+\d\s().-]{8,24}$/.test(values.phone)) errors.phone = 'Informe um telefone válido.'
  if (!allowedTypes.includes(values.projectType)) errors.projectType = 'Selecione um tipo de projeto.'
  if (!Number.isFinite(values.area) || values.area < 10 || values.area > 100000) errors.area = 'Informe uma metragem entre 10 e 100.000 m².'
  if (values.city.length < 2 || values.city.length > 100) errors.city = 'Informe a cidade do projeto.'
  if (!allowedInvestment.includes(values.investment)) errors.investment = 'Selecione uma faixa de investimento.'
  if (values.message.length < 20 || values.message.length > 2000) errors.message = 'Conte um pouco mais sobre o projeto (20 a 2.000 caracteres).'
  if (!values.consent) errors.consent = 'Precisamos do seu consentimento para responder.'

  if (Object.keys(errors).length) {
    return { success: false, message: 'Revise os campos destacados.', errors }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      data: values as any,
      overrideAccess: false,
    })
    return { success: true, message: 'Obrigado. Nossa equipe entrará em contato em até dois dias úteis.' }
  } catch {
    return { success: false, message: 'Não foi possível enviar agora. Tente novamente em alguns instantes.' }
  }
}
