import React, { useState } from 'react'
import '../styles/Galerie.css'

const Galerie = () => {
  // Remplacez ces URLs par vos propres photos
  const photos = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
  ]

  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const openModal = (index) => {
    setSelectedPhoto(index)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    setSelectedPhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setSelectedPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <section className="galerie" id="galerie">
      <div className="container">
        <h2 className="section-title">Notre Love Story</h2>
        <p className="section-subtitle">Quelques moments précieux de notre histoire</p>
        <div className="galerie-grid">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="galerie-item"
              onClick={() => openModal(index)}
            >
              <img src={photo} alt={`Photo ${index + 1}`} />
              <div className="galerie-overlay">
                <span className="galerie-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && (
        <div className="modal" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <button className="modal-prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }}>‹</button>
          <img 
            src={photos[selectedPhoto]} 
            alt={`Photo ${selectedPhoto + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="modal-next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }}>›</button>
        </div>
      )}
    </section>
  )
}

export default Galerie

