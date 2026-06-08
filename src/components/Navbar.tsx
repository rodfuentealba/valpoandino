'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { themeStore } from '../stores/theme'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export default function Navbar() {
  const theme = useStore(themeStore)
  const lang  = useStore(langStore)
  const t     = lang === 'es' ? es.nav : en.nav

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => themeStore.set(theme === 'dark' ? 'light' : 'dark')
  const toggleLang  = () => langStore.set(lang === 'es' ? 'en' : 'es')

  const navLinks = [
    { label: t.inicio,    id: 'hero'      },
    { label: t.andinos,   id: 'andinos'   },
    { label: t.servicios, id: 'servicios' },
    { label: t.collab,    id: 'collab'    },
    { label: t.contacto,  id: 'contacto'  },
  ]

  const textCol = scrolled
    ? 'text-zinc-900 dark:text-white'
    : 'text-white'

  const themeIcon      = theme === 'dark' ? 'bedtime'  : 'sunny'
  const themeIconColor = theme === 'dark' ? 'text-sky-500' : 'text-red-400'

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white dark:bg-zinc-900 shadow-sm' : 'bg-transparent'}
      `}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          <button onClick={() => scrollTo('hero')} aria-label="Inicio">
            <img
              src="/assets/isovalpoAndino.svg"
              alt="Valparaíso Andino"
              className="h-9 w-auto"
            />
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-red-400 ${textCol}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              className={`material-symbols-outlined text-[22px] transition-colors duration-300 ${themeIconColor}`}
            >
              {themeIcon}
            </button>

            <button
              onClick={toggleLang}
              aria-label={`Cambiar a ${lang === 'es' ? 'inglés' : 'español'}`}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 hover:text-red-400 ${textCol}`}
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              onClick={() => scrollTo('contacto')}
              className="ml-2 px-5 py-2 bg-red-400 hover:bg-red-500 text-white text-sm font-semibold uppercase tracking-widest rounded-none transition-colors duration-200"
            >
              {t.reservar}
            </button>

          </div>

          <div className="flex md:hidden items-center gap-3">

            <button
              onClick={toggleTheme}
              aria-label="Toggle tema"
              className={`material-symbols-outlined text-[22px] ${themeIconColor}`}
            >
              {themeIcon}
            </button>

            <button
              onClick={toggleLang}
              aria-label="Toggle idioma"
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${textCol}`}
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              className={`material-symbols-outlined text-[28px] transition-colors duration-300 ${textCol}`}
            >
              {menuOpen ? 'close' : 'menu'}
            </button>

          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-900 flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-white text-3xl font-extrabold uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contacto')}
            className="mt-6 px-8 py-3 bg-red-400 hover:bg-red-500 text-white text-base font-semibold uppercase tracking-widest rounded-none transition-colors"
          >
            {t.reservar}
          </button>
        </div>
      )}
    </>
  )
}
