'use client'
import { useEffect, useState, useRef } from 'react'

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
      import('mapbox-gl/dist/mapbox-gl.css')

      mapboxgl.accessToken = mapboxToken!

      try {
        map = new mapboxgl.Map({
          container: containerRef.current!,
          style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
          center: [lng, lat],
          zoom,
          attributionControl: false,
        })

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        const marker = new mapboxgl.Marker({ color: '#f87171' }).setLngLat([lng, lat]).addTo(map)

        if (popup) {
          marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(popup))
        }

        setStatus('ready')
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
    <div
      ref={containerRef}
      className={`w-full h-full rounded-none overflow-hidden ${className} ${status === 'error' ? 'bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center' : ''}`}
    >
      {status === 'error' && (
        <div className="text-center px-4">
          <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2 block">map</span>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            {mapboxToken ? 'Error al cargar el mapa' : 'Mapa no disponible'}
          </p>
        </div>
      )}
      {status === 'loading' && (
        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-zinc-400">map</span>
        </div>
      )}
    </div>
  )
}
