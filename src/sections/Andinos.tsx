'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Andinos() {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.andinos : en.andinos

  return (
    <section id="andinos" className="relative w-full overflow-visible bg-white dark:bg-zinc-900">
      {/* Contenedor de imagen con altura fija */}
      <div className="relative w-full h-[320px] md:h-[500px]">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/bgAndinos.png')" }}
        />

        {/* Texto sobre la imagen — alineado para que el párrafo termine en el corte */}
        <div className="absolute inset-0 z-10 translate-y-[45%] md:translate-y-[65%]">
          <div className="w-full max-w-6xl mx-auto px-6">
            <div className="ml-auto w-full md:w-1/2 text-left">
              <h2 className="text-7xl font-bold tracking-tight text-red-400 mb-6">{t.titulo}</h2>
              <p className="leading-10 text-xl md:text-2xl text-red-400">{t.texto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ícono anclado al corte inferior izquierdo, mitad dentro / mitad fuera */}
      <div className="absolute bottom-[80%] left-[80%] md:bottom-0 md:left-[15%] z-20 translate-y-1/2 bg-red-400 p-2">
        <span className="material-symbols-outlined text-white text-5xl md:text-7xl">
          verified_user
        </span>
      </div>
    </section>
  )
}
