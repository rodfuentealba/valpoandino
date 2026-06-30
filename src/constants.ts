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
    es: 'Hola! Me interesa saber más información sobre el',
    en: 'Hi! I want to know more about the',
  },
  collabOptions: {
    es: 'Elegí una opción:\n*1* Colegio\n*2* Empresa\n\nRespondé con el número y te contactamos.',
    en: 'Choose an option:\n*1* School\n*2* Company\n\nReply with the number and we will contact you.',
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
    es: 'Hola!',
    en: 'Hi!',
  },
}

export function waBooking(lang: Lang): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.booking[lang])}`
}

export function waService(lang: Lang, serviceName: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${waMsg.service[lang]} ${serviceName} y necesito más información.`)}`
}

export function waCollab(lang: Lang, programName: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${waMsg.collab[lang]} *${programName}*\n\n${waMsg.collabOptions[lang]}`)}`
}

export function waChilcas(lang: Lang): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg.chilcas[lang])}`
}

export function waMoreInfo(lang: Lang, body: string): string {
  const sep = waMsg.servicesOptions[lang]
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${waMsg.moreInfo[lang]}\n\n${sep}\n${body}\n\nRespondé con el número y te enviamos la info.`)}`
}
