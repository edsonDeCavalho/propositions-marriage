import React, { useState, useEffect } from 'react'

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const images = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80'
  ]

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <section id="galerie" className="gallery">
      <div className="container">
        <h2 className="section-title">Notre Love Story</h2>
        <div className="gallery-container">
          <div 
            className="gallery-slider" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {images.map((img, index) => (
              <div 
                key={index}
                className={`gallery-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img 
                  src={img} 
                  alt={`Photo ${index + 1}`}
                  onLoad={(e) => e.target.style.opacity = '1'}
                  style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                />
              </div>
            ))}
          </div>
          <button className="gallery-btn gallery-prev" onClick={prevSlide}>‹</button>
          <button className="gallery-btn gallery-next" onClick={nextSlide}>›</button>
          <div className="gallery-dots">
            {images.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery

