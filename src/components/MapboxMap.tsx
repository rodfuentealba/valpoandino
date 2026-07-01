'use client'
import { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
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
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!mapboxToken || !containerRef.current) {
      if (!mapboxToken) setStatus('error')
      return
    }

    try {
      const map = new mapboxgl.Map({
        accessToken: mapboxToken,
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom,
        attributionControl: false,
      })

      map.on('load', () => setStatus('ready'))
      map.on('error', () => setStatus('error'))
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

      const marker = new mapboxgl.Marker({ color: '#f87171' }).setLngLat([lng, lat]).addTo(map)

      if (popup) {
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(popup))
      }

      mapRef.current = map
    } catch {
      setStatus('error')
    }

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [lng, lat, zoom, popup, mapboxToken])

  return (
    <div className={`relative w-full h-full min-h-[250px] md:min-h-[450px] ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {status !== 'ready' && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center px-4">
            <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2 block">map</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
              {status === 'error' ? (mapboxToken ? 'Error al cargar el mapa' : 'Mapa no disponible') : 'Cargando mapa...'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
