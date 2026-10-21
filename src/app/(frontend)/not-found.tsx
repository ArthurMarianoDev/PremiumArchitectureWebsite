import Link from "next/link"

/**
 * Custom not-found page for the frontend.
 * This renders when `notFound()` is called from any page in the (frontend) route group.
 *
 * Customize this component to match your app's design and provide helpful navigation.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-8 pb-16 pt-32 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-7 font-serif text-6xl tracking-tight md:text-8xl">Este espaço não existe.</h1>
      <p className="mt-6 text-black/55">
        A página pode ter sido movida ou ainda não foi construída.
      </p>
      <Link
        className="link-arrow mt-9"
        href="/"
      >
        ← Voltar ao início
      </Link>
    </main>
  )
}
