import './PracticalInfo.css'

const PracticalInfo = () => {
  return (
    <section className="practical-info">
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Informations Pratiques</h2>
        
        <div className="info-section">
          <h3 className="info-section-title">📍 Plan d'accès</h3>
          <div className="map-container">
            <div className="map-placeholder">
              <p>Château de la Romance</p>
              <p>123 Avenue des Fleurs</p>
              <p>75000 Paris, France</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3 className="info-section-title">🏨 Hébergement</h3>
          <div className="accommodation-list">
            <div className="accommodation-item">
              <h4>Hôtel des Roses</h4>
              <p>À 5 minutes du lieu de réception</p>
              <p>Tél: +33 1 23 45 67 89</p>
            </div>
            <div className="accommodation-item">
              <h4>Chambres d'hôtes Le Jardin</h4>
              <p>Charmant établissement à proximité</p>
              <p>Tél: +33 1 23 45 67 90</p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3 className="info-section-title">👗 Code vestimentaire</h3>
          <p className="dress-code-text">
            Tenue de soirée élégante souhaitée<br />
            Couleurs pastel appréciées
          </p>
        </div>
      </div>
    </section>
  )
}

export default PracticalInfo

