'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Collab() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.collab : en.collab

  return (
    <section id="collab" className="relative w-full bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <p className="text-md font-semibold uppercase text-black dark:text-white mb-16">
          {t.seccion}
        </p>

        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-2 flex flex-col justify-center gap-6 dark:bg-zinc-900 p-8 md:p-12">
            <h3 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight">
              {t.tituloBold}{' '}
              <span className="font-light">{t.titulo}</span>
            </h3>

            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t.texto}
            </p>

            <button className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors hover:scale-105 transition-all">
              {t.cta}
              <span className="material-symbols-outlined text-base">live_help</span>
            </button>
          </div>

          <div
            className="md:col-span-3 relative min-h-[300px] md:min-h-[450px] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/bgCollab.png')" }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
