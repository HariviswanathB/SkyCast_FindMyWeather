import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'

function Weather() {
  const location = useLocation()
  const city = new URLSearchParams(location.search).get('city') || ''

  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!city) return

    setLoading(true)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        setWeatherData(res.data)
        setError('')
      })
      .catch(() => {
        setError('City not found or API error')
      })
      .finally(() => setLoading(false))
  }, [city])

  const tempC = useMemo(() => weatherData?.main?.temp, [weatherData])
  const tempF = useMemo(() => tempC != null ? (tempC * 9/5 + 32).toFixed(2) : null, [tempC])

  return (
    <div className="container">
      <h1>Weather Details</h1>
      <Link to="/">← Back to Home</Link>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Condition:</strong> {weatherData.weather[0].main}</p>
          <p><strong>Temperature:</strong> {tempC}°C / {tempF}°F</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Weather
