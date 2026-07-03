'use client'
import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import { FadeIn } from '../components/Reveal'

const testimonialImages = [
  '/assets/testimonial01.JPG',
  '/assets/testimonial02.JPG',
  '/assets/testimonial04.JPG',
  '/assets/testimonial03.JPG',
]

export default function Testimonial() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.testimonial : en.testimonial
  const [selected, setSelected] = useState(0)

  return (
    <section className="relative w-full overflow-hidden mt-12 md:mt-0">
      {testimonialImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={t.personas[i]?.nombre ?? ''}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${
            i === selected ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <FadeIn className="relative max-w-5xl mx-auto px-6 md:px-8 lg:px-20 py-10 md:py-20">
        <div className="md:grid md:grid-cols-7 md:gap-8">
          <div className="md:col-span-4">
            <div className="p-8 md:p-12 md:pl-0 md:text-left text-center">
              <h2 className="text-md font-semibold uppercase text-red-400 mb-16 md:text-left text-center">
                {t.titulo}
              </h2>
              <p className="text-white md:leading-10 text-md md:text-xl font-light mb-6">
                &ldquo;{t.personas[selected].texto}&rdquo;
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
                {t.personas[selected].nombre}
              </h3>
            </div>

            <div className="flex justify-center md:justify-start gap-2 md:gap-3">
              {t.personas.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`overflow-hidden flex-shrink-0 w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ease-out rounded-full ${
                    i === selected
                      ? 'ring-2 ring-white/80 scale-110'
                      : 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                  }`}
                >
                  <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-bold text-[10px] md:text-xs backdrop-blur-sm">
                    {p.nombre.charAt(0)}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:col-span-3" />
        </div>
      </FadeIn>
    </section>
  )
}
