import React from 'react'
import '../styles/Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-names">Yannick & Lydia</h1>
        <p className="hero-tagline">Ensemble pour toujours</p>
        <div className="hero-date">
          <span className="date-day">15</span>
          <span className="date-month">Juin</span>
          <span className="date-year">2024</span>
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

