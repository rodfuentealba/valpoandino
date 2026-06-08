import { atom } from 'nanostores'

const stored = typeof localStorage !== 'undefined'
  ? localStorage.getItem('va-theme')
  : null
const prefersDark =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false

export const themeStore = atom<'light' | 'dark'>(
  stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
)

themeStore.subscribe((theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('va-theme', theme)
})
