'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import { themeStore } from '../stores/theme'
import { langStore } from '../stores/lang'

interface WeatherData {
  temperature: number
  apparentTemperature: number
  weatherCode: number
  windSpeed: number
  precipitation: number
  precipitationProbability: number
}

function getWeatherIcon(code: number): string {
  if (code === 0) return 'sunny'
  if (code <= 2) return 'partly_cloudy_day'
  if (code === 3) return 'cloudy'
  if (code >= 45 && code <= 48) return 'foggy'
  if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65)) return 'rainy'
  if (code >= 56 && code <= 57) return 'weather_snowy'
  if (code >= 71 && code <= 77) return 'weather_snowy'
  if (code >= 80 && code <= 82) return 'rainy'
  if (code >= 85 && code <= 86) return 'weather_snowy'
  if (code >= 95) return 'thunderstorm'
  return 'sunny'
}

function getWeatherLabel(code: number, es: boolean): string {
  if (code === 0) return es ? 'Despejado' : 'Clear'
  if (code <= 2) return es ? 'Parcialmente nublado' : 'Partly cloudy'
  if (code === 3) return es ? 'Nublado' : 'Overcast'
  if (code >= 45 && code <= 48) return es ? 'Niebla' : 'Foggy'
  if (code >= 51 && code <= 55) return es ? 'Llovizna' : 'Drizzle'
  if (code >= 56 && code <= 57) return es ? 'Lluvia helada' : 'Freezing rain'
  if (code >= 61 && code <= 65) return es ? 'Lluvia' : 'Rain'
  if (code >= 71 && code <= 77) return es ? 'Nieve' : 'Snow'
  if (code >= 80 && code <= 82) return es ? 'Chubascos' : 'Showers'
  if (code >= 85 && code <= 86) return es ? 'Nieve' : 'Snow showers'
  if (code >= 95) return es ? 'Tormenta' : 'Thunderstorm'
  return es ? 'Despejado' : 'Clear'
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState(false)
  const theme = useStore(themeStore)
  const lang = useStore(langStore)
  const isDark = theme === 'dark'
  const es = lang === 'es'

  useEffect(() => {
    let mounted = true
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-32.849&longitude=-70.957&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=precipitation_probability_max&timezone=auto',
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (!mounted) return
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          apparentTemperature: Math.round(data.current.apparent_temperature),
          weatherCode: data.current.weather_code,
          windSpeed: Math.round(data.current.wind_speed_10m),
          precipitation: data.current.precipitation ?? 0,
          precipitationProbability: data.daily?.precipitation_probability_max?.[0] ?? 0,
        })
        setError(false)
      } catch {
        if (mounted) setError(true)
      }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 300000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  const precipWarning =
    weather && (weather.precipitationProbability > 25 || weather.precipitation > 0)
  const cardBg = isDark ? 'bg-black/30' : 'bg-white/30'
  const textPrimary = 'text-white'
  const textSecondary = 'text-white/70'
  const textTertiary = 'text-white/50'

  const position =
    'absolute left-1/2 -translate-x-1/2 md:left-32 md:-translate-x-0 top-1/2 -translate-y-1/2 w-72 md:w-80'

  if (error && !weather) {
    return (
      <div className={`${position} p-5 rounded-2xl ${cardBg} backdrop-blur-sm shadow-lg`}>
        <div className={`text-xs ${textTertiary} text-center`}>
          {es ? 'Clima no disponible' : 'Weather unavailable'}
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className={`${position} p-5 rounded-2xl ${cardBg} backdrop-blur-sm  shadow-lg`}>
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-400/20" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-zinc-400/20 rounded w-2/3" />
            <div className="h-3 bg-zinc-400/20 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${position} p-5 rounded-2xl ${cardBg} backdrop-blur-sm  shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textTertiary}`}>
            Live
          </span>
        </div>
        <span className={`text-[10px] font-medium ${textTertiary}`}>Las Chilcas</span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <span className={`material-symbols-outlined text-5xl ${textPrimary} animate-weather-float`}>
          {getWeatherIcon(weather.weatherCode)}
        </span>
        <div>
          <span className={`text-4xl font-bold ${textPrimary}`}>{weather.temperature}°</span>
          <span className={`block text-xs ${textSecondary}`}>
            {getWeatherLabel(weather.weatherCode, es)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`flex items-center gap-1.5 ${textSecondary}`}>
          <span className="material-symbols-outlined text-xl">thermostat</span>
          <span>
            {es ? 'Sensación' : 'Feels'} {weather.apparentTemperature}°
          </span>
        </div>
        <div className={`flex items-center gap-1.5 ${textSecondary}`}>
          <span className="material-symbols-outlined text-xl">air</span>
          <span>{weather.windSpeed} km/h</span>
        </div>
        {precipWarning && (
          <div className="col-span-2 flex items-center gap-1.5 mt-1 pt-2 border-t border-zinc-200/20 dark:border-zinc-700/20 text-red-400 font-semibold">
            <span className="material-symbols-outlined text-xl animate-pulse">water_drop</span>
            <span>
              {es
                ? `Posible lluvia (${weather.precipitationProbability}%)`
                : `Rain possible (${weather.precipitationProbability}%)`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
