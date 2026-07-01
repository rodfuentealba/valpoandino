'use client'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import gsap from 'gsap'

const taglines = (lang: 'es' | 'en') => {
  const t = lang === 'es' ? es.hero.tagline : en.hero.tagline
  return t.split('||').map((s) => s.trim())
}

export default function AnimatedTagline() {
  const lang = useStore(langStore)
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  const lines = taglines(lang)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
      },
    )

    const interval = setInterval(() => {
      gsap.to(el, {
        opacity: 0,
        y: -12,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setIndex((i) => (i + 1) % lines.length)
          gsap.fromTo(
            el,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            },
          )
        },
      })
    }, 3700)

    return () => clearInterval(interval)
  }, [lines.length])

  return (
    <p className="text-white text-xs md:text-lg uppercase tracking-[0.3rem] md:tracking-[1rem] mb-6 font-bold min-h-[1.2em]">
      <span ref={ref}>{lines[index]}</span>
    </p>
  )
}
