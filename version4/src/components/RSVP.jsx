import { useState } from 'react'
import './RSVP.css'

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '',
    dietary: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    alert('Merci pour votre réponse ! Nous avons bien reçu votre confirmation.')
    setFormData({
      name: '',
      email: '',
      attendance: '',
      guests: '',
      dietary: '',
      message: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="rsvp">
      <div className="section-floral-decoration top"></div>
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Confirmez Votre Présence</h2>
        <p className="rsvp-subtitle">Votre présence nous tient à cœur</p>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="attendance">Serez-vous présent(e) ? *</label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez...</option>
              <option value="yes">Oui, avec plaisir !</option>
              <option value="no">Malheureusement non</option>
            </select>
          </div>
          {formData.attendance === 'yes' && (
            <>
              <div className="form-group">
                <label htmlFor="guests">Nombre d'invités</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dietary">Régime alimentaire / Allergies</label>
                <textarea
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Végétarien, allergies, etc."
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="message">Message (optionnel)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Un petit mot pour les mariés..."
            />
          </div>
          <button type="submit" className="rsvp-submit-btn">
            Envoyer
          </button>
        </form>
      </div>
      <div className="section-floral-decoration bottom"></div>
    </section>
  )
}

export default RSVP

