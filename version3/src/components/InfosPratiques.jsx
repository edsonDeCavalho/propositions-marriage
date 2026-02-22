import React from 'react'
import '../styles/InfosPratiques.css'

const InfosPratiques = () => {
  return (
    <section className="infos-pratiques" id="infos-pratiques">
      <div className="container">
        <h2 className="section-title">Informations Pratiques</h2>
        <div className="infos-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Date</h3>
            <p>Samedi 26 Mars 2027</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Heure de la Cérémonie</h3>
            <p>15h00</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Lieu</h3>
            <p>L&apos;Orangerie de l&apos;Orée du Bois<br />D113, 78710 Rosny-sur-Seine</p>
            <a href="#lieu" style={{ marginTop: '0.5rem', fontSize: '0.95rem', display: 'inline-block', color: 'inherit', textDecoration: 'underline' }}>Découvrir le lieu →</a>
          </div>
          <div className="info-card">
            <div className="info-icon">🍽️</div>
            <h3>Réception & Dîner</h3>
            <p>
              Cérémonie, cocktail et dîner au même domaine, au cœur de la forêt de Rosny-sur-Seine (Yvelines).
              <span className="info-time">À partir de 17h00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfosPratiques

