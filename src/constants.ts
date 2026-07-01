export const PHONE = '56962822676'

type Lang = 'es' | 'en'

const waMsg = {
  booking: {
    es: '¡Hola! Quiero reservar una actividad con Valparaíso Andino. ¿Me puedes enviar los servicios disponibles?',
    en: 'Hi! I want to book an activity with Valparaíso Andino. Can you send me the available services?',
  },
  service: {
    es: 'Hola! Vi el programa de',
    en: 'Hi! I saw the program of',
  },
  collab: {
    es: 'Hola! Necesito saber más información sobre el programa educativo.',
    en: 'Hi! I need more information about the educational program.',
  },
  servicesOptions: {
    es: 'Elegí una opción:',
    en: 'Choose an option:',
  },
  chilcas: {
    es: 'Hola! Quiero saber más sobre el sector Las Chilcas.',
    en: 'Hi! I want to know more about Las Chilcas sector.',
  },
  moreInfo: {
    es: 'Hola! Necesito saber mas información sobre los talleres.',
    en: 'Hi! I need more information about the workshops.',
  },
}

export function waBooking(lang: Lang): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.booking[lang])}`
}

export function waService(lang: Lang, serviceName: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${waMsg.service[lang]} ${serviceName} y necesito más información.`)}`
}

export function waCollab(lang: Lang, _programName: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.collab[lang])}`
}

export function waChilcas(lang: Lang): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.chilcas[lang])}`
}

export function waMoreInfo(lang: Lang, _body: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.moreInfo[lang])}`
}
