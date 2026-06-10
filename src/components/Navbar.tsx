'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { themeStore } from '../stores/theme'
import { langStore } from '../stores/lang'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import Isotype from './icons/Isotype'

export default function Navbar() {
  const theme = useStore(themeStore)
  const lang  = useStore(langStore)
  const t     = lang === 'es' ? es.nav : en.nav

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('va-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) themeStore.set('dark')

    const savedLang = localStorage.getItem('va-lang')
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'es'
    langStore.set((savedLang as 'es' | 'en') ?? browserLang)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 max-w-sm md:max-w-4xl mx-auto ${scrolled ? 'top-10 bg-white shadow-lg dark:bg-zinc-900' : 'top-3 bg-transparent'}`}>
        <div className="px-5 h-14 md:h-16 flex items-center justify-between">

          <button onClick={() => scrollTo('hero')} aria-label="Inicio" className={textCol}>
            <Isotype className="h-8 md:h-9 w-auto transition-all duration-300" />
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-xs font-regular uppercase tracking-widest transition-colors duration-300 hover:text-red-400 ${textCol}`}
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
              aria-label={lang === 'es' ? 'English' : 'Español'}
              className={`material-symbols-outlined text-[20px] transition-colors duration-300 hover:text-red-400 ${textCol}`}
            >
              {lang === 'es' ? 'language_us' : 'language_spanish'}
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
              aria-label={lang === 'es' ? 'English' : 'Español'}
              className={`material-symbols-outlined text-[20px] transition-colors duration-300 hover:text-red-400 ${textCol}`}
            >
              {lang === 'es' ? 'language_us' : 'language_spanish'}
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

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white dark:bg-zinc-900 backdrop-blur-sm flex flex-col items-center justify-center gap-8`}
      >
        <div className={`transition-all duration-300 ease-in-out text-center ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {navLinks.map((link) => (
            <div key={link.id} className="mb-8">
              <button
                onClick={() => scrollTo(link.id)}
                className="text-zinc-900 dark:text-white text-4xl font-regular uppercase tracking-widest hover:text-red-400 transition-colors"
              >
                {link.label}
              </button>
            </div>
          ))}
          <button
            onClick={() => scrollTo('contacto')}
            className="mt-6 px-8 py-3 bg-red-400 hover:bg-red-500 text-white text-base font-semibold uppercase tracking-widest rounded-none transition-colors"
          >
            {t.reservar}
          </button>
        </div>
      </div>
    </>
  )
}
