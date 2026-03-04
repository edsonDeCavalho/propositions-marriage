import React from 'react'

const images = [
  '/images/love-story-1.png',
  '/images/love-story-2.png',
  '/images/love-story-3.png'
]

const Gallery = () => {
  return (
    <section id="galerie" className="gallery">
      <div className="container">
        <h2 className="section-title">Notre Love Story</h2>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div key={index} className="gallery-grid-item">
              <img src={img} alt={`Photo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
