'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

const serviceImages = [
  '/assets/service01.png',
  '/assets/service02.png',
]

function HighlightedText({ texto, destacado }: { texto: string; destacado: string }) {
  if (!destacado) return <>{texto}</>
  const parts = texto.split(destacado)
  if (parts.length < 2) return <>{texto}</>
  return (
    <>
      {parts[0]}
      <span className="text-red-400 font-bold">{destacado}</span>
      {parts.slice(1).join('')}
    </>
  )
}

export default function Servicios() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.servicios : en.servicios

  return (
    <section id="servicios" className="relative w-full bg-white dark:bg-zinc-900 overflow-hidden mt-[25%] md:mt-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">

        <p className="text-md font-semibold uppercase text-black dark:text-white mb-16">
          {t.titulo}
        </p>

        <div className="space-y-20 md:space-y-32">
          {t.filas.map((fila, i) => {
            const isReversed = i % 2 !== 0
            const img = serviceImages[i] ?? '/assets/service01.png'

            return (
              <div key={i} className="grid md:grid-cols-5 gap-0">
                {isReversed ? (
                  <>
                    <div
                      className="md:col-span-3 relative min-h-[300px] md:min-h-[400px] bg-cover bg-center order-2 md:order-1"
                      style={{ backgroundImage: `url('${img}')` }}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="md:col-span-2 flex flex-col text-left justify-between gap-6 dark:bg-zinc-900 py-8 md:p-12 order-1 md:order-2">
                      <h3 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white md:-translate-x-[40%] relative z-10">
                        {fila.titulo}{' '}
                        <span className="font-light">{fila.subtitulo}</span>
                      </h3>

                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        <HighlightedText texto={fila.texto} destacado={fila.destacado} />
                      </p>

                      <button className="hidden md:inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 md:-translate-x-[40%] relative z-10 hover:scale-105 transition-all">
                        {fila.cta}
                        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                      </button>
                    </div>

                    <button className="md:hidden -mt-6 relative z-10 inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors mx-8 order-3">
                      {fila.cta}
                      <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2 flex flex-col text-left md:text-right justify-center gap-6 dark:bg-zinc-900 py-8 md:p-12">
                      <h3 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white md:-translate-x-[-40%] relative z-10">
                        {fila.titulo}{' '}
                        <span className="font-light">{fila.subtitulo}</span>
                      </h3>

                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        <HighlightedText texto={fila.texto} destacado={fila.destacado} />
                      </p>

                      <button className="hidden md:inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 md:-translate-x-[-40%] relative z-10 hover:scale-105 transition-all">
                        {fila.cta}
                        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                      </button>
                    </div>
                    <div
                      className="md:col-span-3 relative min-h-[300px] md:min-h-[400px] bg-cover bg-center"
                      style={{ backgroundImage: `url('${img}')` }}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <button className="md:hidden -mt-6 relative z-10 inline-flex justify-between items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors mx-8">
                      {fila.cta}
                      <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-20 md:gap-16 mt-16 md:mt-32">
          {t.columnas.map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                
                <span className="material-symbols-outlined text-black dark:text-white text-5xl">
                  {col.icono}
                </span>
              </div>
              <h4 className="text-4xl leading-3 font-bold mb-3 text-zinc-900 dark:text-white">
                {col.tituloBold}
              </h4>
              <h4 className="text-4xl font-regular mb-3 text-zinc-900 dark:text-white">
                {col.titulo}
              </h4>
              <p className="px-10 md:p-0 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {col.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-red-400 hover:bg-red-500 hover:scale-105 transition-all  text-white text-xs font-bold uppercase tracking-widest px-6 py-3">
          Más Información
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
        </div>

      </div>
    </section>
  )
}
