import React from 'react'
import '../styles/CarteHebergement.css'

const CarteHebergement = () => {
  const hotels = [
    {
      name: 'Hôtel [Nom]',
      address: '123 Rue de l\'Hôtel, 75000 [Ville]',
      distance: '5 min en voiture',
      phone: '+33 X XX XX XX XX',
      link: '#'
    },
    {
      name: 'Hôtel [Nom]',
      address: '456 Avenue de l\'Hôtel, 75000 [Ville]',
      distance: '10 min en voiture',
      phone: '+33 X XX XX XX XX',
      link: '#'
    }
  ]

  return (
    <section className="carte-hebergement" id="carte-hebergement">
      <div className="container">
        <h2 className="section-title">Carte & Hébergement</h2>
        
        <div className="carte-section">
          <div className="carte-map">
            {/* Remplacez par une vraie carte Google Maps ou autre service */}
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937606!2d2.2922926156743895!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte du lieu de mariage"
              ></iframe>
            </div>
          </div>
          
          <div className="carte-info">
            <h3><span className="emoji">📍</span> Lieu du mariage</h3>
            <p>
              L&apos;Orangerie de l&apos;Orée du Bois<br />
              D113, 78710 Rosny-sur-Seine<br />
              Dans Waze : « L&apos;Orangerie de l&apos;Orée du Bois, Rosny sur Seine »
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              <a href="https://www.lorangeriedeloreedubois.com/galerie" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Galerie photos du lieu →</a>
            </p>
          </div>
        </div>

        <div className="hebergement-section">
          <h3 className="hebergement-title"><span className="emoji">💤</span> Suggestions d'Hébergement</h3>
          <p className="hebergement-intro">
            Pour votre confort, voici quelques suggestions d'hôtels à proximité :
          </p>
          
          <div className="hotels-grid">
            {hotels.map((hotel, index) => (
              <div key={index} className="hotel-card">
                <h4>{hotel.name}</h4>
                <p className="hotel-address">{hotel.address}</p>
                <p className="hotel-distance"><span className="emoji">📍</span> {hotel.distance}</p>
                <p className="hotel-phone"><span className="emoji">📞</span> {hotel.phone}</p>
                <a href={hotel.link} className="hotel-link" target="_blank" rel="noopener noreferrer">
                  Voir sur la carte →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarteHebergement

