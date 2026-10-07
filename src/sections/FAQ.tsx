'use client'
import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import { waBooking } from '../constants'
import { FadeIn } from '../components/Reveal'

export default function FAQ() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.faq : en.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="w-full bg-white dark:bg-zinc-900 py-20 md:py-32 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Título grande, texto y botón de contacto */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                {t.tituloPrincipal} <br />
                <span className="font-light text-zinc-800 dark:text-zinc-200">
                  {t.tituloSecundario}
                </span>
              </h2>

              <p className="mt-8 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light max-w-md">
                {t.descripcion}
              </p>

              <div className="mt-8">
                <a
                  href={waBooking(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c.969.541 1.838.835 2.809.835 3.18 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.818-5.771-5.818zm9.969 5.766c0 5.505-4.475 9.97-9.969 9.97-1.719 0-3.364-.44-4.815-1.258l-5.216 1.35 1.39-5.075c-.93-1.49-1.429-3.218-1.429-4.987 0-5.504 4.475-9.97 9.969-9.97 5.503 0 10.07 4.466 10.07 9.97z" />
                  </svg>
                  {t.cta}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Columna Derecha: Acordeón con cards grises y animaciones fluidas */}
          <div className="lg:col-span-7 space-y-3.5">
            {t.items.map((item, idx) => {
              const isOpen = openIndex === idx
              const list = 'list' in item && Array.isArray(item.list) ? item.list : null
              const modalities =
                'modalities' in item && Array.isArray(item.modalities) ? item.modalities : null

              return (
                <FadeIn
                  key={item.pregunta}
                  className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 p-6 transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-red-500 transition-colors duration-200">
                      {item.pregunta}
                    </span>

                    {/* Botón circular con icono + / - y rotación fluida (rojo al estar activo) */}
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ease-out ${
                        isOpen
                          ? 'bg-red-400 text-white border-red-400 rotate-180 shadow-sm'
                          : 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 group-hover:border-zinc-500 rotate-0'
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        {/* Línea horizontal fija */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        {/* Línea vertical que se desvanece suavemente */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16"
                          className={`origin-center transition-all duration-300 ease-out ${
                            isOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                          }`}
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Contenedor animado con grid-template-rows */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                        {/* Frase destacada en bold */}
                        {item.lead && (
                          <p className="font-semibold text-zinc-900 dark:text-white leading-snug">
                            {item.lead}
                          </p>
                        )}

                        {/* Texto complementario si existe */}
                        {'body' in item && item.body && (
                          <p className="font-light text-zinc-600 dark:text-zinc-400">{item.body}</p>
                        )}

                        {/* Lista con emojis (ejemplo: equipo técnico) */}
                        {list && (
                          <div className="space-y-2.5 pt-1">
                            {'listTitle' in item && item.listTitle && (
                              <p className="text-xs uppercase tracking-wider font-bold text-red-400">
                                {item.listTitle}
                              </p>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {list.map((el) => (
                                <div
                                  key={el.text}
                                  className="flex items-center gap-2.5 bg-white/70 dark:bg-zinc-900/60 rounded-xl px-3.5 py-2 border border-zinc-200/60 dark:border-zinc-700/50"
                                >
                                  <span className="text-lg leading-none" aria-hidden="true">
                                    {el.icon}
                                  </span>
                                  <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    {el.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {'footerNote' in item && item.footerNote && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1 font-light italic">
                                {item.footerNote}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Modalidades separadas con saltos de línea y numeración (transporte) */}
                        {modalities && (
                          <div className="space-y-3 pt-1">
                            {'listTitle' in item && item.listTitle && (
                              <p className="text-xs uppercase tracking-wider font-bold text-red-400">
                                {item.listTitle}
                              </p>
                            )}
                            <div className="space-y-2.5">
                              {modalities.map((m) => (
                                <div
                                  key={m.num}
                                  className="bg-white/80 dark:bg-zinc-900/70 p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-700/60"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
                                      MODALIDAD {m.num}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                      {m.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed pl-1">
                                    {m.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
