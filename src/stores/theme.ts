import { atom } from 'nanostores'

export const themeStore = atom<'light' | 'dark'>('light')

themeStore.subscribe((theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('va-theme', theme)
})
