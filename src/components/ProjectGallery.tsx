'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { MediaAsset } from '@/lib/aurea-data'

export function ProjectGallery({ images }: { images: { media: MediaAsset; caption?: string | null }[] }) {
  const [active, setActive] = useState<number | null>(null)
  const close = useCallback(() => setActive(null), [])
  const move = useCallback((direction: number) => {
    setActive((current) => current === null ? null : (current + direction + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active === null) return
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, move])

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map(({ media, caption }, index) => (
          <button
            type="button"
            key={`${media.id}-${index}`}
            onClick={() => setActive(index)}
            className={`group text-left ${index === 0 ? 'md:col-span-2' : ''}`}
            aria-label={`Ampliar: ${media.alt}`}
          >
            <div className={`relative overflow-hidden bg-[#ded8cc] ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
              <Image src={media.url!} alt={media.alt} fill sizes={index === 0 ? '100vw' : '50vw'} className="object-cover transition duration-700 group-hover:scale-[1.02]" />
            </div>
            {caption && <span className="mt-3 block text-xs text-black/50">{caption}</span>}
          </button>
        ))}
      </div>
      {active !== null && (
        <div role="dialog" aria-modal="true" aria-label="Galeria ampliada" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#151515]/95 p-5 text-white">
          <button type="button" onClick={close} className="absolute right-6 top-6 z-10 text-xs uppercase tracking-[0.18em]">Fechar ×</button>
          <button type="button" onClick={() => move(-1)} className="absolute left-4 z-10 p-4 text-3xl md:left-8" aria-label="Imagem anterior">←</button>
          <div className="relative h-[78vh] w-[82vw]">
            <Image src={images[active].media.url!} alt={images[active].media.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => move(1)} className="absolute right-4 z-10 p-4 text-3xl md:right-8" aria-label="Próxima imagem">→</button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/60">{active + 1} / {images.length}</p>
        </div>
      )}
    </>
  )
}
