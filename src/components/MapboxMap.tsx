'use client'
import { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.PUBLIC_MAPBOX_TOKEN

interface Props {
  lng: number
  lat: number
  zoom?: number
  popup?: string
  className?: string
}

export default function MapboxMap({ lng, lat, zoom = 13, popup, className = '' }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const check = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const containerId = 'mapbox-map'

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setHasError(true)
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    try {
      const map = new mapboxgl.Map({
        container: containerId,
        style:
          theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

      const marker = new mapboxgl.Marker({ color: '#f87171' }).setLngLat([lng, lat]).addTo(map)

      if (popup) {
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(popup))
      }

      return () => map.remove()
    } catch {
      setHasError(true)
    }
  }, [theme, lng, lat, zoom, popup])

  if (hasError) {
    return (
      <div
        className={`w-full h-full rounded-none overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center ${className}`}
      >
        <div className="text-center px-4">
          <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2 block">map</span>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            {MAPBOX_TOKEN ? 'Error al cargar el mapa' : 'Mapa no disponible'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id={containerId} className={`w-full h-full rounded-none overflow-hidden ${className}`} />
  )
}
