'use client'
import { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN

interface Props {
  lng: number
  lat: number
  zoom?: number
  popup?: string
  className?: string
}

export default function MapboxMap({ lng, lat, zoom = 13, popup, className = '' }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

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
    const map = new mapboxgl.Map({
      container: containerId,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    const marker = new mapboxgl.Marker({ color: '#f87171' })
      .setLngLat([lng, lat])
      .addTo(map)

    if (popup) {
      marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(popup))
    }

    return () => map.remove()
  }, [theme, lng, lat, zoom, popup])

  return (
    <div
      id={containerId}
      className={`w-full h-full rounded-none overflow-hidden ${className}`}
    />
  )
}
