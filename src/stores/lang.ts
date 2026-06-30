import { atom } from 'nanostores'

function detectLang(): 'es' | 'en' {
  if (typeof localStorage === 'undefined') return 'es'
  const saved = localStorage.getItem('va-lang')
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language.startsWith('en') ? 'en' : 'es'
}

export const langStore = atom<'es' | 'en'>(detectLang())

langStore.subscribe((lang) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('va-lang', lang)
})
