'use client'
import { useState, useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

const placeholderBg = [
  'bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300',
  'bg-purple-300', 'bg-pink-300', 'bg-teal-300',
]

export default function Testimonial() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.testimonial : en.testimonial
  const [selected, setSelected] = useState(3)

  const reordered = useCallback(() => {
    const arr = t.personas.map((p, i) => ({ ...p, i }))
    const result: typeof arr = []
    for (let offset = -3; offset <= 3; offset++) {
      const idx = ((selected + offset) % arr.length + arr.length) % arr.length
      result.push(arr[idx])
    }
    return result
  }, [selected, t.personas])

  const items = reordered()
  const center = items[3]

  return (
    <section id="testimonial" className="relative w-full bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">

        <p className="text-md font-semibold uppercase text-black dark:text-white mb-16">
          {t.titulo}
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-5 mb-12">
          {items.map((item, pos) => {
            const isCenter = pos === 3
            return (
              <button
                key={`${item.i}-${pos}`}
                onClick={() => setSelected(item.i)}
                className={`rounded-full overflow-hidden transition-all duration-300 flex-shrink-0 ${isCenter ? 'w-16 h-16 md:w-20 md:h-20 ring-2 ring-red-400 ring-offset-2' : 'w-12 h-12 md:w-14 md:h-14 grayscale hover:grayscale-0'}`}
              >
                <div className={`w-full h-full ${placeholderBg[item.i % placeholderBg.length]} flex items-center justify-center text-white font-bold text-sm`}>
                  {item.nombre.charAt(0)}
                </div>
              </button>
            )
          })}
        </div>

        <div className="bg-red-400 p-8 md:p-12 max-w-3xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            {center.nombre}
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
            &ldquo;{center.texto}&rdquo;
          </p>
        </div>

      </div>
    </section>
  )
}
