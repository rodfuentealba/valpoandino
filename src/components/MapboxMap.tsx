'use client'
import { useEffect, useState, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
  lng: number
  lat: number
  zoom?: number
  popup?: string
  className?: string
  mapboxToken?: string
}

export default function MapboxMap({ lng, lat, zoom = 13, popup, className = '', mapboxToken }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const check = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mapboxToken || !containerRef.current) {
      if (!mapboxToken) setStatus('error')
      return
    }

    let map: mapboxgl.Map | null = null

    import('mapbox-gl').then((mod) => {
      const mapboxgl = mod.default

      mapboxgl.accessToken = mapboxToken

      try {
        map = new mapboxgl.Map({
          container: containerRef.current!,
          style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
          center: [lng, lat],
          zoom,
          attributionControl: false,
        })

        map.on('load', () => setStatus('ready'))

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        const marker = new mapboxgl.Marker({ color: '#f87171' }).setLngLat([lng, lat]).addTo(map)

        if (popup) {
          marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(popup))
        }

        map.on('error', () => setStatus('error'))
      } catch {
        setStatus('error')
      }
    }).catch(() => {
      setStatus('error')
    })

    return () => {
      if (map) map.remove()
    }
  }, [theme, lng, lat, zoom, popup, mapboxToken])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {status === 'loading' && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-4xl text-zinc-400">map</span>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4">
            <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2 block">map</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
              {mapboxToken ? 'Error al cargar el mapa' : 'Mapa no disponible'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
