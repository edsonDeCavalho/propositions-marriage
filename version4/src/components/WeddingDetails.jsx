import './WeddingDetails.css'

const WeddingDetails = () => {
  return (
    <section className="wedding-details">
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Les Détails</h2>
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon">📅</div>
            <h3 className="detail-title">Date</h3>
            <p className="detail-text">Samedi 15 Juin 2024</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">⏰</div>
            <h3 className="detail-title">Heure</h3>
            <p className="detail-text">Cérémonie à 16h00</p>
            <p className="detail-text">Réception à 18h00</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">📍</div>
            <h3 className="detail-title">Lieu</h3>
            <p className="detail-text">Château de la Romance</p>
            <p className="detail-text">123 Avenue des Fleurs</p>
            <p className="detail-text">75000 Paris, France</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeddingDetails

