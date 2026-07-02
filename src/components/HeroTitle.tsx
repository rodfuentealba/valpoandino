'use client'
import { useRef, useEffect } from 'react'
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

export default function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('h1 > span > span')
      if (!chars.length) return

      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.025,
          delay: 0.9,
          ease: 'power3.out',
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <h1 ref={ref} className="text-white dark:text-zinc-900">
      <span className="block text-7xl md:text-[10rem] lg:text-[12rem] font-light tracking-tight leading-none">
        {splitText('valparaíso')}
      </span>
      <span className="block text-7xl md:text-[10rem] lg:text-[12rem] font-black tracking-tight leading-none">
        {splitText('Andino.')}
      </span>
    </h1>
  )
}
