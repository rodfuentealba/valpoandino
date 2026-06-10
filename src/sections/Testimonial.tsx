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

export default function Testimonial() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.testimonial : en.testimonial
  const [selected, setSelected] = useState(3)

  const offset = -(selected - 3) * STEP

  return (
    <section id="testimonial" className="relative w-full bg-red-400 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-20 py-10 md:py-20">
        <p className="text-center text-md font-semibold uppercase text-white mb-16">
          {t.titulo}
        </p>

        <div className="relative w-full overflow-hidden" style={{ height: '5rem' }}>
          <div
            className="absolute inset-0 flex items-center justify-center gap-3 md:gap-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {t.personas.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 w-14 h-14 md:w-16 md:h-16 ${
                  i === selected
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-red-400 scale-110 shadow-lg'
                    : 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-full h-full ${placeholderBg[i]} flex items-center justify-center text-white font-bold text-sm`}>
                  {p.nombre.charAt(0)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 max-w-3xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.personas[selected].nombre}
          </h3>
          <p className="text-sm md:text-base text-white leading-relaxed font-light">
            &ldquo;{t.personas[selected].texto}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
