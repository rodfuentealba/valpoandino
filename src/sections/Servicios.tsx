'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Servicios() {
  const lang = useStore(langStore)
  const t    = lang === 'es' ? es.servicios : en.servicios

  const bgColors = ['bg-zinc-300 dark:bg-zinc-700', 'bg-zinc-400 dark:bg-zinc-600']

  return (
    <section id="servicios" className="relative w-full bg-zinc-50 dark:bg-zinc-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400 mb-16">
          {t.titulo}
        </p>

        <div className="space-y-20 md:space-y-32">
          {t.filas.map((fila, i) => {
            const isReversed = i % 2 !== 0
            return (
              <div
                key={i}
                className="grid md:grid-cols-5 gap-0"
              >
                {isReversed ? (
                  <>
                    <div className="md:col-span-3 relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                      <div className={`absolute inset-0 ${bgColors[i % bgColors.length]}`} />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-8 md:top-12 left-6 md:left-10 right-6 md:right-10">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-md">
                          {fila.titulo}
                        </h3>
                      </div>
                      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-10">
                        <button className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors">
                          {fila.cta}
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-center bg-white dark:bg-zinc-900 p-8 md:p-12">
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {fila.texto}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2 flex items-center bg-white dark:bg-zinc-900 p-8 md:p-12">
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {fila.texto}
                      </p>
                    </div>
                    <div className="md:col-span-3 relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                      <div className={`absolute inset-0 ${bgColors[i % bgColors.length]}`} />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-8 md:top-12 left-6 md:left-10 right-6 md:right-10">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-md">
                          {fila.titulo}
                        </h3>
                      </div>
                      <div className="absolute bottom-8 md:bottom-12 right-6 md:right-10">
                        <button className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors">
                          {fila.cta}
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16 mt-20 md:mt-32">
          {t.columnas.map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-400 mb-6">
                <span className="material-symbols-outlined text-white text-3xl">
                  {col.icono}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">
                {col.titulo}
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {col.texto}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
