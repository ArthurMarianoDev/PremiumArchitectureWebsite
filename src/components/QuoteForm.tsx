'use client'

import { useActionState } from 'react'
import { submitQuote, type QuoteState } from '@/app/(frontend)/contato/actions'

const initialState: QuoteState = { success: false, message: '' }

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-xs text-red-800">{message}</p> : null
}

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initialState)

  if (state.success) {
    return <div className="border-y border-black/25 py-14"><p className="eyebrow">Solicitação enviada</p><p className="mt-5 max-w-xl font-serif text-4xl">{state.message}</p></div>
  }

  return (
    <form action={action} className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      <div><label htmlFor="name" className="eyebrow">Nome</label><input id="name" name="name" className="field" autoComplete="name" required /><ErrorText message={state.errors?.name} /></div>
      <div><label htmlFor="email" className="eyebrow">E-mail</label><input id="email" name="email" type="email" className="field" autoComplete="email" required /><ErrorText message={state.errors?.email} /></div>
      <div><label htmlFor="phone" className="eyebrow">Telefone / WhatsApp</label><input id="phone" name="phone" className="field" autoComplete="tel" required /><ErrorText message={state.errors?.phone} /></div>
      <div><label htmlFor="city" className="eyebrow">Cidade do projeto</label><input id="city" name="city" className="field" autoComplete="address-level2" required /><ErrorText message={state.errors?.city} /></div>
      <div><label htmlFor="projectType" className="eyebrow">Tipo de projeto</label><select id="projectType" name="projectType" className="field" defaultValue="" required><option value="" disabled>Selecione</option><option value="residencial">Residencial</option><option value="comercial">Comercial</option><option value="interiores">Interiores</option><option value="consultoria">Consultoria</option></select><ErrorText message={state.errors?.projectType} /></div>
      <div><label htmlFor="area" className="eyebrow">Metragem estimada</label><input id="area" name="area" type="number" min="10" max="100000" className="field" placeholder="m²" required /><ErrorText message={state.errors?.area} /></div>
      <div className="md:col-span-2"><label htmlFor="investment" className="eyebrow">Faixa de investimento</label><select id="investment" name="investment" className="field" defaultValue="" required><option value="" disabled>Selecione</option><option value="ate-300k">Até R$ 300 mil</option><option value="300k-700k">R$ 300 a 700 mil</option><option value="700k-1.5m">R$ 700 mil a 1,5 milhão</option><option value="acima-1.5m">Acima de R$ 1,5 milhão</option></select><ErrorText message={state.errors?.investment} /></div>
      <div className="md:col-span-2"><label htmlFor="message" className="eyebrow">Conte sobre o projeto</label><textarea id="message" name="message" rows={5} className="field resize-none" minLength={20} maxLength={2000} required /><ErrorText message={state.errors?.message} /></div>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="companyWebsite">Website</label><input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" /></div>
      <div className="md:col-span-2"><label className="flex items-start gap-3 text-sm leading-6 text-black/60"><input type="checkbox" name="consent" className="mt-1 accent-[#202020]" required /> Autorizo o uso dos meus dados para contato sobre esta solicitação, conforme a Política de Privacidade.</label><ErrorText message={state.errors?.consent} /></div>
      {state.message && <p role="alert" className="md:col-span-2 text-sm text-red-800">{state.message}</p>}
      <div className="md:col-span-2"><button type="submit" disabled={pending} className="w-full bg-[#202020] px-7 py-5 text-xs uppercase tracking-[.2em] text-white transition hover:bg-[#C5B49C] hover:text-[#202020] disabled:opacity-50">{pending ? 'Enviando…' : 'Enviar solicitação ↗'}</button></div>
    </form>
  )
}
