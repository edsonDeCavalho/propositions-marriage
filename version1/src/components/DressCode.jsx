import React, { useEffect, useRef } from 'react'

const DressCode = () => {
  const dresscodeRef = useRef(null)

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

    const cards = dresscodeRef.current?.querySelectorAll('.dresscode-card')
    cards?.forEach(card => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="dresscode" className="dresscode" ref={dresscodeRef}>
      <div className="container">
        <h2 className="section-title">Que Prévoir ?</h2>
        <div className="dresscode-content">
          <div className="dresscode-card">
            <div className="dresscode-icon">👔</div>
            <h3>Dress Code</h3>
            <p>Tenue élégante souhaitée</p>
            <ul>
              <li>Pour les hommes : Costume ou tenue habillée</li>
              <li>Pour les femmes : Robe de cocktail ou tenue élégante</li>
            </ul>
          </div>
          <div className="dresscode-card dresscode-colors">
            <div className="dresscode-icon">🎨</div>
            <h3>Palette de couleurs</h3>
            <p className="dresscode-colors-label">Pour les hommes</p>
            <div className="dresscode-swatches">
              <span className="dresscode-swatch" style={{ backgroundColor: '#c5c6be' }} title="#c5c6be" />
              <span className="dresscode-swatch" style={{ backgroundColor: '#b79973' }} title="#b79973" />
            </div>
            <p className="dresscode-colors-label">Pour les femmes</p>
            <div className="dresscode-swatches">
              <span className="dresscode-swatch" style={{ backgroundColor: '#503a2d' }} title="#503a2d" />
              <span className="dresscode-swatch" style={{ backgroundColor: '#dbcbbc' }} title="#dbcbbc" />
              <span className="dresscode-swatch" style={{ backgroundColor: '#c09d9b' }} title="#c09d9b" />
              <span className="dresscode-swatch" style={{ backgroundColor: '#999f85' }} title="#999f85" />
            </div>
          </div>
          <div className="dresscode-card">
            <div className="dresscode-icon">🌤️</div>
            <h3>Météo</h3>
            <p>Prévoyez selon la saison</p>
            <ul>
              <li>En cas de beau temps : Tenue légère et confortable</li>
              <li>En cas de pluie : Parapluie et chaussures adaptées</li>
              <li>Soirée : Une petite veste peut être utile</li>
            </ul>
          </div>
          <div className="dresscode-card">
            <div className="dresscode-icon">💐</div>
            <h3>Autres Infos</h3>
            <p>Détails pratiques</p>
            <ul>
              <li>Parking disponible sur place</li>
              <li>Animaux de compagnie non autorisés</li>
              <li>Fumeurs : Espace dédié à l'extérieur</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode

