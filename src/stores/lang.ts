import { atom } from 'nanostores'

export const langStore = atom<'es' | 'en'>('es')

langStore.subscribe((lang) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('va-lang', lang)
})
