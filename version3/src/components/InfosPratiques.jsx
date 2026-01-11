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
            <p>Samedi 15 Juin 2024</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Heure de la Cérémonie</h3>
            <p>15h00</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Lieu de la Cérémonie</h3>
            <p>
              {/* Modifiez avec votre adresse */}
              Mairie de [Votre Ville]<br />
              123 Rue de la Mairie<br />
              75000 [Votre Ville]
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🍽️</div>
            <h3>Réception & Dîner</h3>
            <p>
              {/* Modifiez avec votre lieu de réception */}
              [Nom du Lieu de Réception]<br />
              456 Avenue de la Réception<br />
              75000 [Votre Ville]<br />
              <span className="info-time">À partir de 17h00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfosPratiques

