'use client'
import { useRef, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Andinos() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.andinos : en.andinos
  const imgRef = useRef<HTMLImageElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1 },
          {
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: imgRef.current.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: iconRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      if (textRef.current) {
        const els = textRef.current.querySelectorAll('h2, p')
        if (els.length) {
          gsap.fromTo(
            els,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.15,
              scrollTrigger: {
                trigger: textRef.current.parentElement,
                start: 'top 80%',
                end: 'top 30%',
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
    <section id="andinos" className="relative w-full overflow-visible bg-white dark:bg-zinc-900">
      <div className="relative w-full h-[320px] md:h-[500px] overflow-hidden">
        <img
          ref={imgRef}
          src="/assets/bgAndinos.png"
          alt="Montañas de los Andes"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      <div ref={textRef} className="absolute left-0 right-0 bottom-0 z-10 translate-y-1/2">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="ml-auto w-full md:w-1/2 text-left">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-red-400 mb-6 opacity-0 translate-y-8">
              {t.titulo}
            </h2>
            <p className="leading-9 md:leading-10 text-lg md:text-2xl text-red-400 opacity-0 translate-y-8">
              {t.texto}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={iconRef}
        className="absolute bottom-[80%] left-[80%] md:bottom-0 md:left-[15%] z-20 translate-y-1/2 bg-red-400 p-2"
      >
        <span className="material-symbols-outlined text-white text-5xl md:text-7xl">
          verified_user
        </span>
      </div>
    </section>
  )
}
