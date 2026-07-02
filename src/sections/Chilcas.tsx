'use client'
import { useRef, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import { FadeIn } from '../components/Reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitText(text: string) {
  return text.split('').map((char, i) => (
    <span key={i} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export default function Chilcas() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.chilcas : en.chilcas
  const imgRef = useRef<HTMLImageElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const img = imgRef.current
    const icon = iconRef.current
    const title = titleRef.current
    if (!icon) return

    const ctx = gsap.context(() => {
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      gsap.to(icon, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: icon.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      if (title) {
        const chars = title.querySelectorAll('p > span')
        if (chars.length) {
          gsap.fromTo(
            chars,
            { opacity: 0, y: 40, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'none',
              stagger: 0.04,
              scrollTrigger: {
                trigger: title.parentElement,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
              },
            },
          )
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chilcas"
      className="relative w-full h-[360px] md:min-h-screen bg-white dark:bg-zinc-900 overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center pointer-events-none select-none z-0">
        <div
          ref={titleRef}
          className="text-center md:text-left"
          data-astro-transition-name="chilcas-title"
          data-astro-transition-animate="morph"
        >
          <p className="text-6xl md:text-8xl lg:text-[10rem] font-light text-black dark:text-white leading-none tracking-tight">
            {splitText('LasChilcas')}
          </p>
          <p className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-black dark:text-white leading-none tracking-tight -mt-3 md:-mt-8">
            {splitText('LlayLlay.')}
          </p>
        </div>
      </div>

      <FadeIn
        as="div"
        className="relative z-10 w-full flex items-center justify-center py-8 md:py-2"
        data-astro-transition-name="chilcas-image"
        data-astro-transition-animate="morph"
      >
        <img
          ref={imgRef}
          src="/assets/bgChilcas.png"
          alt="Las Chilcas - LlayLlay"
          className="w-full h-auto object-contain grayscale"
        />
      </FadeIn>

      <FadeIn
        as="div"
        className="absolute z-20 bottom-[10%] left-[10%] md:bottom-[35%] md:left-[18%] max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32 flex items-center justify-center"
      >
        <a
          href="/chilcas"
          className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 hover:scale-105 transition-all text-white text-xs font-bold uppercase tracking-widest px-6 py-3"
        >
          {t.cta}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </a>
      </FadeIn>

      <div
        ref={iconRef}
        className="absolute top-20 md:top-[10%] right-[15%] z-20 translate-y-1/2 bg-red-400 p-2"
        data-astro-transition-name="chilcas-icon"
        data-astro-transition-animate="morph"
      >
        <span className="material-symbols-outlined text-white text-3xl md:text-7xl">
          brightness_5
        </span>
      </div>
    </section>
  )
}
