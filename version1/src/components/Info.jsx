import React, { useEffect, useRef } from 'react'

const Info = () => {
  const infoRef = useRef(null)

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

    const cards = infoRef.current?.querySelectorAll('.info-card')
    cards?.forEach(card => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="infos" className="info" ref={infoRef}>
      <div className="container">
        <h2 className="section-title">Informations Pratiques</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Date</h3>
            <p>Samedi 15 Juin 2024</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Heure</h3>
            <p>Cérémonie : 15h00<br />Cocktail : 16h30<br />Dîner : 19h00</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Cérémonie</h3>
            <p>Mairie de [Votre Ville]<br />Place de la Mairie<br />12345 [Votre Ville]</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🍾</div>
            <h3>Réception</h3>
            <p>[Nom du Lieu]<br />[Adresse complète]<br />12345 [Ville]</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info

