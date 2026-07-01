'use client'
import { useRef, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import { waCollab } from '../constants'
import { FadeIn } from '../components/Reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Collab() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.collab : en.collab
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const icon = iconRef.current
    if (!icon) return

    const ctx = gsap.context(() => {
      gsap.to(icon, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: icon.parentElement,
          start: 'bottom top',
          end: 'top bottom',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collab"
      className="relative w-full bg-white dark:bg-zinc-900 md:-translate-y-[9%] z-10 mt-10 md:mt-0"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={iconRef}
          className="absolute -top-[15%] md:top-0 left-5 md:left-[15%] z-20 md:-translate-y-40 bg-red-400 p-2"
        >
          <span className="material-symbols-outlined text-white text-5xl md:text-7xl">
            handshake
          </span>
        </div>

        <FadeIn
          as="p"
          className="text-md font-semibold uppercase text-black dark:text-white mt-0 mb-16"
        >
          {t.seccion}
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-0">
          <FadeIn
            as="div"
            className="md:col-span-2 flex flex-col text-left md:text-right justify-between dark:bg-zinc-900 p-0 md:p-12 relative z-10"
          >
            <h3 className="text-6xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white relative z-10 md:translate-x-[40%]">
              {t.tituloBold} <span className="font-light">{t.titulo}</span>
            </h3>

            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t.texto}
            </p>

            <a
              href={waCollab(lang, t.tituloBold)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 md:translate-x-[40%] relative z-10 hover:scale-105 transition-all"
            >
              {t.cta}
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </a>
          </FadeIn>

          <FadeIn
            as="div"
            className="md:col-span-3 relative z-0 overflow-hidden min-h-[300px] md:min-h-[600px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{ backgroundImage: "url('/assets/bgCollab.png')" }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </FadeIn>

          <a
            href={waCollab(lang, t.tituloBold)}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden bg-red-400 hover:bg-red-500 text-white text-sm font-bold uppercase shadow-lg tracking-widest px-6 py-3 absolute z-10 -bottom-7 left-[16%]"
          >
            {t.cta}
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
