import React, { useState, useEffect, useRef } from 'react'

const base = import.meta.env.BASE_URL
const images = [
  `${base}images/love-story-1.png`,
  `${base}images/love-story-2.png`,
  `${base}images/love-story-3.png`
]

const Story = () => {
  const storyRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

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
    <section id="histoire" className="story" ref={storyRef}>
      <div className="container">
        <h2 className="section-title">Notre Histoire</h2>
        <div className="story-content">
          <div className="story-text">
            <p className="story-intro">
              C&apos;est dans un moment de grâce que nos chemins se sont croisés, comme deux étoiles qui se rencontrent dans la vaste étendue du ciel.
              <br /><br />
              Chaque jour passé ensemble a été une page de notre livre d&apos;amour, écrite avec tendresse, rires partagés et moments précieux.
              <br /><br />
              Aujourd&apos;hui, nous sommes heureux de vous inviter à célébrer avec nous le début d&apos;un nouveau chapitre, celui où nos deux cœurs ne font plus qu&apos;un.
            </p>
          </div>
          <div className="story-image story-image--carousel">
            <div className="gallery-container">
              <div
                className="gallery-slider"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`gallery-slide ${index === currentSlide ? 'active' : ''} ${index === 0 ? 'gallery-slide--vertical' : ''}`}
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
              <button type="button" className="gallery-btn gallery-prev" onClick={prevSlide} aria-label="Photo précédente">‹</button>
              <button type="button" className="gallery-btn gallery-next" onClick={nextSlide} aria-label="Photo suivante">›</button>
              <div className="gallery-dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    role="button"
                    tabIndex={0}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    onKeyDown={(e) => e.key === 'Enter' && goToSlide(index)}
                    aria-label={`Photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
