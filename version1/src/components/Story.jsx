import React, { useState, useEffect, useRef } from 'react'

const base = import.meta.env.BASE_URL
const images = [
  `${base}images/love-story-1.jpg`,
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
            <h3 className="story-lang-title"><span className="story-lang-emoji" aria-hidden>🇫🇷</span> Notre histoire</h3>
            <p className="story-intro">
              Notre histoire a commencé pendant nos études, à un moment où l&apos;on ne sait pas encore très bien où la vie nous mènera… mais visiblement, elle nous menait l&apos;un vers l&apos;autre.
              <br /><br />
              Depuis, nous avons grandi ensemble, parcouru quelques coins du monde, accumulé des souvenirs et partagé beaucoup de fous rires.
              <br /><br />
              Entre voyages, projets et moments simples du quotidien, notre aventure continue… et cette fois, nous avons décidé d&apos;y ajouter un nouveau chapitre : notre mariage.
              <br /><br />
              Et nous serions très heureux de vous avoir à nos côtés pour le célébrer.
            </p>
            <h3 className="story-lang-title"><span className="story-lang-emoji" aria-hidden>🇵🇹</span> A nossa história</h3>
            <p className="story-intro story-intro--pt">
              A nossa história começou durante os nossos estudos, numa altura em que ainda não sabemos muito bem para onde a vida nos vai levar… mas, ao que parece, levava-nos um ao outro.
              <br /><br />
              Desde então, crescemos juntos, percorremos alguns cantos do mundo, acumulámos memórias e partilhámos muitas gargalhadas.
              <br /><br />
              Entre viagens, projetos e momentos simples do dia a dia, a nossa aventura continua… e desta vez decidimos acrescentar um novo capítulo: o nosso casamento.
              <br /><br />
              E ficaríamos muito felizes por vos ter ao nosso lado para o celebrar.
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
