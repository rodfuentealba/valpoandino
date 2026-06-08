import { atom } from 'nanostores'

const stored = typeof localStorage !== 'undefined'
  ? localStorage.getItem('va-lang')
  : null
const browserLang =
  typeof navigator !== 'undefined' && navigator.language.startsWith('en')
    ? 'en'
    : 'es'

export const langStore = atom<'es' | 'en'>(
  (stored as 'es' | 'en') ?? browserLang
)

langStore.subscribe((lang) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('va-lang', lang)
})
