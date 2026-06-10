'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Collab() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.collab : en.collab

  return (
    <section id="collab" className="relative w-full bg-white dark:bg-zinc-900 md:-translate-y-[19%] z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="absolute -top-[15%] md:top-0 left-5 md:left-[15%] z-20 md:-translate-y-40 bg-red-400 p-2">
          <span className="material-symbols-outlined text-white text-5xl md:text-7xl">
            handshake
          </span>
        </div>
        <p className="text-md font-semibold uppercase text-black dark:text-white mt-0 mb-16">
          {t.seccion}
        </p>

        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-2 flex flex-col text-left md:text-right justify-between dark:bg-zinc-900 p-0 md:p-12">
            <h3 className="text-6xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white relative z-10 md:translate-x-[40%]">
              {t.tituloBold}{' '}
              <span className="font-light">{t.titulo}</span>
            </h3>

            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t.texto}
            </p>

            <button className="hidden md:inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 md:translate-x-[40%] relative z-10 hover:scale-105 transition-all">
              {t.cta}
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </button>
          </div>

          <div
            className="md:col-span-3 relative min-h-[300px] md:min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/bgCollab.png')" }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <button className="md:hidden bg-red-400 hover:bg-red-500 text-white text-sm font-bold uppercase tracking-widest px-6 py-3 absolute z-10 -bottom-7 left-[16%]">
              {t.cta}
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </button>
        </div>
      </div>
    </section>
  )
}
