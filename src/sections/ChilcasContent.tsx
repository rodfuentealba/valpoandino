'use client'
import { useStore } from '@nanostores/react'
import { langStore } from '../stores/lang'
import { es, en } from '../i18n/index'
import MapboxMap from '../components/MapboxMap'
import WeatherCard from '../components/WeatherCard'
import { waChilcas } from '../constants'
import { FadeIn } from '../components/Reveal'

interface Props {
  mapboxToken?: string
}

export default function ChilcasContent({ mapboxToken }: Props) {
  const lang = useStore(langStore)
  const t = lang === 'es' ? es.chilcasPage : en.chilcasPage

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-32">
        <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-8">
          {t.title}
        </h1>

        <FadeIn className="grid md:grid-cols-5 gap-8 md:gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            {t.techInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-400 text-xl mt-0.5 shrink-0">
                  {item.icon}
                </span>
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                    {item.label}
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-3 space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400 leading-8 font-light">{t.subtitle}</p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-8 font-light">{t.subtitle2}</p>
          </div>
        </FadeIn>

        <img
          src="/assets/ChilcasSeparator.jpg"
          alt="Pared de escalada Las Chilcas"
          loading="lazy"
          className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-16 md:my-24 h-[300px] md:h-[650px] object-cover"
        />

        <div className="space-y-20 md:space-y-32 mt-20">
          <FadeIn className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                {t.block1Title} <br></br>
                <span className="text-red-400 font-light">{t.block1TitleLight}</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {t.block1Text}
              </p>
              <div className="mt-8 space-y-6">
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">
                  {t.routesTitle}
                </h3>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-2xl">school</span>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">
                      {t.routeSchool}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {t.routeSchoolList.map((r) => (
                      <li
                        key={r.name}
                        className="flex items-center justify-between text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                      >
                        <span className="italic">{r.name}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                            {r.fame}
                          </span>
                          <span className="font-bold text-red-400">{r.grade}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-2xl">star</span>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">
                      {t.routeExpert}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {t.routeExpertList.map((r) => (
                      <li
                        key={r.name}
                        className="flex items-center justify-between text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                      >
                        <span className="italic">{r.name}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                            {r.fame}
                          </span>
                          <span className="font-bold text-red-400">{r.grade}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 relative overflow-hidden min-h-[550px] md:h-full group">
              <video
                src="/assets/service03.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </FadeIn>

          <FadeIn className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 md:order-1 order-2 relative overflow-hidden min-h-[550px] md:h-full group">
              <video
                src="/assets/service04.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="md:col-span-3 md:order-2 order-1">
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                {t.block2Title}{' '}
                <span className="text-red-400 font-light">{t.block2TitleLight}</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
                {t.block2Text}
              </p>
              <div className="space-y-5">
                {t.envItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 text-2xl mt-0.5 shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">
                        {item.title}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed font-light">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-16 md:my-24">
        <div className="sticky top-0 h-[400px] md:h-[600px] overflow-hidden">
          <video
            src="/assets/chilcasInside01.mp4"

            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <FadeIn
          as="div"
          className="relative -mt-[400px] md:-mt-[600px] h-[400px] md:h-[600px] flex flex-col justify-between px-6 py-12 md:py-20"
        >
          <p className="text-white dark:text-zinc-900 text-3xl md:text-5xl lg:text-9xl font-bold leading-tight md:-mt-24">
            {t.parallaxText1}
          </p>
          <p className="text-white dark:text-zinc-900 text-3xl md:text-5xl lg:text-9xl font-light leading-tight text-right md:-mb-28">
            {t.parallaxText2}
          </p>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn as="blockquote" className="my-20 md:my-28 border-l-4 border-red-400 pl-6 md:pl-10">
          <p className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light italic">
            {t.citaText}
          </p>
          <footer className="mt-4 text-sm text-red-400 font-bold tracking-widest uppercase">
            {t.citaAuthor}
          </footer>
        </FadeIn>

        <FadeIn className="mt-20">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                {t.block3Title} <br></br>
                <span className="text-red-400 font-light">{t.block3TitleLight}</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {t.block3Text}
              </p>
            </div>
            <div className="md:col-span-3 relative overflow-hidden group">
              <MapboxMap
                lng={-70.957}
                lat={-32.849}
                zoom={14}
                popup={lang === 'es' ? 'Las Chilcas, LlayLlay' : 'Las Chilcas, LlayLlay'}
                mapboxToken={mapboxToken}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-28">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-12 text-center">
            {t.infoTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="group/card bg-zinc-50 dark:bg-zinc-800/50 p-6 md:p-8 hover:bg-red-400 dark:hover:bg-red-400 hover:scale-[1.03] transition-all duration-500 ease-out cursor-default">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-red-400 group-hover/card:text-white mb-2 block transition-colors duration-300">
                ac_unit
              </span>
              <h3 className="text-sm font-bold text-red-400 group-hover/card:text-white tracking-widest uppercase mb-3 transition-colors duration-300">
                {t.infoSeason}
              </h3>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 group-hover/card:text-white leading-relaxed font-light transition-colors duration-300">
                {t.infoSeasonText}
              </p>
            </div>
            <div className="group/card bg-zinc-50 dark:bg-zinc-800/50 p-6 md:p-8 hover:bg-red-400 dark:hover:bg-red-400 hover:scale-[1.03] transition-all duration-500 ease-out cursor-default">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-red-400 group-hover/card:text-white mb-2 block transition-colors duration-300">
                health_and_safety
              </span>
              <h3 className="text-sm font-bold text-red-400 group-hover/card:text-white tracking-widest uppercase mb-3 transition-colors duration-300">
                {t.infoSafety}
              </h3>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 group-hover/card:text-white leading-relaxed font-light transition-colors duration-300">
                {t.infoSafetyText}
              </p>
            </div>
            <div className="group/card bg-zinc-50 dark:bg-zinc-800/50 p-6 md:p-8 hover:bg-red-400 dark:hover:bg-red-400  hover:scale-[1.03] transition-all duration-500 ease-out cursor-default">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-red-400 group-hover/card:text-white mb-2 block transition-colors duration-300">
                camping
              </span>
              <h3 className="text-sm font-bold text-red-400 group-hover/card:text-white tracking-widest uppercase mb-3 transition-colors duration-300">
                {t.infoCamping}
              </h3>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 group-hover/card:text-white leading-relaxed font-light transition-colors duration-300">
                {t.infoCampingText}
              </p>
            </div>
            <div className="group/card bg-zinc-50 dark:bg-zinc-800/50 p-6 md:p-8 hover:bg-red-400 dark:hover:bg-red-400 hover:scale-[1.03] transition-all duration-500 ease-out cursor-default">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-red-400 group-hover/card:text-white mb-2 block transition-colors duration-300">
                handyman
              </span>
              <h3 className="text-sm font-bold text-red-400 group-hover/card:text-white tracking-widest uppercase mb-3 transition-colors duration-300">
                {t.infoRoutes}
              </h3>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 group-hover/card:text-white leading-relaxed font-light transition-colors duration-300">
                {t.infoRoutesText}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="flex justify-center mt-24">
          <a
            href={waChilcas(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 hover:scale-105 transition-all text-white text-xs font-bold uppercase tracking-widest px-8 py-4"
          >
            {t.cta}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        </FadeIn>

        <FadeIn className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-24">
          <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
            <img
              src="/assets/service05.jpg"
              alt="Las Chilcas"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <WeatherCard />
          </div>
        </FadeIn>
      </div>
    </>
  )
}
