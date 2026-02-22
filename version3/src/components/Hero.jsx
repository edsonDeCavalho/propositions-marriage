import React, { useEffect, useState } from 'react'
import '../styles/Hero.css'

const TARGET_DATE = new Date('2027-03-26T00:00:00')

const Hero = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = TARGET_DATE - now
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-names">Yannick & Lydia</h1>
        <div className="hero-countdown">
          <p className="hero-countdown-label">Plus que</p>
          <div className="hero-countdown-grid">
            <span className="hero-countdown-item"><strong>{countdown.days}</strong> jours</span>
            <span className="hero-countdown-item"><strong>{countdown.hours}</strong> h</span>
            <span className="hero-countdown-item"><strong>{countdown.minutes}</strong> min</span>
            <span className="hero-countdown-item"><strong>{countdown.seconds}</strong> s</span>
          </div>
          <p className="hero-countdown-date">avant le 26 Mars 2027</p>
        </div>
        <p className="hero-tagline">Ensemble pour toujours</p>
        <div className="hero-date">
          <span className="date-day">26</span>
          <span className="date-month">Mars</span>
          <span className="date-year">2027</span>
        </div>
      </div>
      <div className="hero-image">
        {/* Remplacez cette URL par votre photo de couple */}
        <img 
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&q=80" 
          alt="Yannick & Lydia"
          className="hero-photo"
        />
      </div>
    </section>
  )
}

export default Hero

