import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!city.trim()) {
      setError('City name is required')
    } else {
      setError('')
      navigate(`/weather?city=${city.trim()}`)
    }
  }, [city, navigate])

  return (
    <div className="container">
      <h1>SkyCast - Find My Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Home
