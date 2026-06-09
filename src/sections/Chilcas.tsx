'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Chilcas() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.chilcas : en.chilcas

  return (
    <section id="chilcas" className="relative w-full min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">

      <div className="absolute inset-0 flex justify-center pointer-events-none select-none z-0">
        <div className="text-center md:text-left mt-20 md:mt-28">
          <p className="text-6xl md:text-8xl lg:text-[10rem] font-light text-black dark:text-zinc-800 leading-none tracking-tight">
            LasChilcas
          </p>
          <p className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-black dark:text-zinc-800 leading-none tracking-tight -mt-4 md:-mt-6 blur-[0.2rem]">
            LLayLlay.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center py-20 md:py-32">
        <img
          src="/assets/bgChilcas.png"
          alt="Las Chilcas - LlayLlay"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32 flex items-center justify-center">
        <button className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors">
          {t.cta}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>

      <div className="absolute top-8 right-8 md:top-16 md:right-16 z-20">
        <span className="material-symbols-outlined text-4xl md:text-5xl text-red-400 opacity-60">
          brightness_5
        </span>
      </div>

    </section>
  )
}
