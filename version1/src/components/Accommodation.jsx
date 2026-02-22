import React, { useEffect, useRef } from 'react'

const Accommodation = () => {
  const accommodationRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const items = accommodationRef.current?.querySelectorAll('.hotel-item')
    items?.forEach(item => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hebergement" className="accommodation" ref={accommodationRef}>
      <div className="container">
        <h2 className="section-title">Carte & Hébergement</h2>
        <div className="accommodation-content">
          <div className="map-container">
            <div className="map-placeholder">
              <p><span className="emoji">📍</span> Carte interactive</p>
              <p className="map-note">L&apos;Orangerie de l&apos;Orée du Bois — D113, 78710 Rosny-sur-Seine. Dans Waze : « L&apos;Orangerie de l&apos;Orée du Bois, Rosny sur Seine »</p>
              {/* Pour intégrer Google Maps, remplacez ce div par un iframe */}
              {/* <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="400" style={{border:0}} allowFullScreen="" loading="lazy"></iframe> */}
            </div>
          </div>
          <div className="hotels-list">
            <h3>Hôtels à proximité</h3>
            <div className="hotel-item">
              <h4>Hôtel [Nom]</h4>
              <p><span className="emoji">📍</span> [Adresse]</p>
              <p><span className="emoji">📞</span> [Téléphone]</p>
              <p><span className="emoji">💶</span> À partir de [Prix]/nuit</p>
            </div>
            <div className="hotel-item">
              <h4>Hôtel [Nom]</h4>
              <p><span className="emoji">📍</span> [Adresse]</p>
              <p><span className="emoji">📞</span> [Téléphone]</p>
              <p><span className="emoji">💶</span> À partir de [Prix]/nuit</p>
            </div>
            <div className="hotel-item">
              <h4>Hôtel [Nom]</h4>
              <p><span className="emoji">📍</span> [Adresse]</p>
              <p><span className="emoji">📞</span> [Téléphone]</p>
              <p><span className="emoji">💶</span> À partir de [Prix]/nuit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Accommodation

