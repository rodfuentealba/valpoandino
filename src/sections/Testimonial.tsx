'use client'
import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

const placeholderBg = [
  'bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300',
  'bg-purple-300', 'bg-pink-300', 'bg-teal-300',
]

const STEP = 76

function slot(i: number, selected: number): number {
  return ((i - selected + 10) % 7) - 3
}

export default function Testimonial() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.testimonial : en.testimonial
  const [selected, setSelected] = useState(3)

  return (
    <section id="testimonial" className="relative w-full bg-red-400 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-20 py-10 md:py-20">
        <p className="text-center text-md font-semibold uppercase text-white mb-16">
          {t.titulo}
        </p>

        <div className="relative w-full" style={{ height: '5rem' }}>
          {t.personas.map((p, i) => {
            const s = slot(i, selected)
            const isCenter = s === 0
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex-shrink-0 w-14 h-14 md:w-14 md:h-14 transition-all duration-500 ease-out ${
                  isCenter
                    ? 'scale-130 shadow-lg z-10 ring-2 ring-white ring-offset-2 ring-offset-red-400'
                    : 'scale-100 grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
                }`}
                style={{ left: `calc(50% + ${s * STEP}px)` }}
              >
                <div className={`w-full h-full ${placeholderBg[i]} flex items-center justify-center text-white font-bold text-sm`}>
                  {p.nombre.charAt(0)}
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-8 md:p-12 max-w-3xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.personas[selected].nombre}
          </h3>
          <p className=" text-white leading-10 text-xl font-light">
            &ldquo;{t.personas[selected].texto}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
