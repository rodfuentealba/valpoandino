'use client'
import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'span' | 'section' | 'article' | 'blockquote' | 'p'
  y?: number
  duration?: number
  delay?: number
}

export function FadeIn({
  children,
  className = '',
  as: Tag = 'div',
  y = 30,
  duration = 0.7,
  delay = 0,
  ...rest
}: FadeInProps & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref as any} className={className} {...rest}>
      {children}
    </Tag>
  )
}

interface StaggerInProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  y?: number
  duration?: number
  stagger?: number
  delay?: number
}

export function StaggerIn({
  children,
  className = '',
  as: Tag = 'div',
  y = 30,
  duration = 0.6,
  stagger = 0.12,
  delay = 0,
}: StaggerInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return <Tag ref={ref as any} className={className}>{children}</Tag>
}
