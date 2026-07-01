'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

const taglines = (lang: 'es' | 'en') => {
  const t = lang === 'es' ? es.hero.tagline : en.hero.tagline
  return t.split('||').map((s) => s.trim())
}

export default function AnimatedTagline() {
  const lang = useStore(langStore)
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const lines = taglines(lang)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % lines.length)
        setFade(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [lines.length])

  return (
    <p className="text-white text-xs md:text-lg uppercase tracking-[0.3rem] md:tracking-[1rem] mb-6 font-bold min-h-[1.2em]">
      <span
        className="transition-opacity duration-500 ease-in-out"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {lines[index]}
      </span>
    </p>
  )
}
