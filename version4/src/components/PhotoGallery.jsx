import { useState } from 'react'
import './PhotoGallery.css'

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Placeholder images - à remplacer par de vraies photos
  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Photo 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', alt: 'Photo 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80', alt: 'Photo 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Photo 4' },
  ]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <section className="photo-gallery">
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Nos Moments</h2>
        <div className="gallery-container">
          <div className="gallery-slider">
            <div 
              className="gallery-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos.map((photo) => (
                <div key={photo.id} className="gallery-slide">
                  <img src={photo.url} alt={photo.alt} className="gallery-image" />
                </div>
              ))}
            </div>
          </div>
          <div className="gallery-controls">
            <button className="gallery-btn prev" onClick={prevPhoto}>‹</button>
            <div className="gallery-indicators">
              {photos.map((_, index) => (
                <button
                  key={index}
                  className={`gallery-indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button className="gallery-btn next" onClick={nextPhoto}>›</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoGallery

