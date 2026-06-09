'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Andinos() {
  const lang = useStore(langStore)
  const t    = lang === 'es' ? es.andinos : en.andinos

  return (
    <section id="andinos" className="relative w-full min-h-screen flex items-center bg-white dark:bg-zinc-900">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-red-400">
              {t.titulo}
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t.texto}
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="/assets/bgAndinos.png"
              alt="Andinos"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
