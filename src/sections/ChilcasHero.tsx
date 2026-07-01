'use client'

export default function ChilcasHero() {
  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-zinc-900 overflow-hidden flex flex-col">
      <div className="absolute inset-0 flex items-start justify-center pt-[12%] pointer-events-none select-none z-0">
        <div
          className="text-center md:text-left"
          data-astro-transition-name="chilcas-title"
          data-astro-transition-animate="morph"
        >
          <p className="mt-[40%] md:mt-0 text-7xl md:text-8xl lg:text-[10rem] font-light text-black dark:text-white leading-none tracking-tight">
            LasChilcas
          </p>
          <p className="text-7xl md:text-8xl lg:text-[10rem] font-bold text-black dark:text-white leading-none tracking-tight -mt-4 md:-mt-10">
            LLayLlay.
          </p>
        </div>
      </div>

      <div
        className="relative z-10 w-full mt-auto"
        data-astro-transition-name="chilcas-image"
        data-astro-transition-animate="morph"
      >
        <img
          src="/assets/bgChilcas.png"
          alt="Las Chilcas - LlayLlay"
          className="w-full h-auto object-contain"
        />
      </div>

      <div
        className="absolute top-[55%] md:top-[35%] right-[38%] md:right-[15%] z-20 bg-red-400 p-3"
        data-astro-transition-name="chilcas-icon"
        data-astro-transition-animate="morph"
      >
        <span className="material-symbols-outlined text-white text-6xl md:text-7xl">
          brightness_5
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <span className="text-xs font-regular text-center tracking-widest text-zinc-400 dark:text-zinc-500">
          Para más información <br />
          sigue scroleando
        </span>
        <span className="material-symbols-outlined text-2xl text-zinc-400 dark:text-zinc-500 animate-bounce">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  )
}
