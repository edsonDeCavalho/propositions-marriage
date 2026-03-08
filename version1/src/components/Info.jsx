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
        <h2 className="section-title">Détails du Mariage</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Date</h3>
            <p>Vendredi 26 Mars 2027</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Heure</h3>
            <p>Cérémonie : 15h00<br />Cocktail : 16h30<br />Dîner : 19h00</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Lieu</h3>
            <p>L&apos;Orangerie de l&apos;Orée du Bois<br />D113, 78710 Rosny-sur-Seine</p>
            <a href="#lieu" style={{ marginTop: '0.5rem', fontSize: '0.95rem', display: 'inline-block', color: 'inherit', textDecoration: 'underline' }}>Découvrir le lieu →</a>
          </div>
          <div className="info-card">
            <div className="info-icon">🍾</div>
            <h3>Réception</h3>
            <p>Même lieu : cérémonie, cocktail et dîner au domaine. À partir de 17h00.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info

