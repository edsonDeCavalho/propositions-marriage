import React, { useState } from 'react'
import '../styles/RSVP.css'

const RSVP = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    nombreInvites: '1',
    message: '',
    preferencesAlimentaires: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique pour envoyer les données à un serveur
    console.log('Données RSVP:', formData)
    setSubmitted(true)
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nom: '',
        email: '',
        nombreInvites: '1',
        message: '',
        preferencesAlimentaires: ''
      })
    }, 3000)
  }

  return (
    <section className="rsvp" id="rsvp">
      <div className="container">
        <h2 className="section-title">Confirmez Votre Présence</h2>
        <p className="section-subtitle">
          Nous serions ravis de partager ce moment spécial avec vous
        </p>
        
        {submitted ? (
          <div className="rsvp-success">
            <div className="success-icon">✓</div>
            <h3>Merci pour votre confirmation !</h3>
            <p>Nous avons bien reçu votre réponse et avons hâte de vous voir.</p>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Nom complet *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Votre nom"
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
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombreInvites">Nombre d'invités *</label>
              <select
                id="nombreInvites"
                name="nombreInvites"
                value={formData.nombreInvites}
                onChange={handleChange}
                required
              >
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
                <option value="5+">5 personnes ou plus</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preferencesAlimentaires">Préférences alimentaires</label>
              <textarea
                id="preferencesAlimentaires"
                name="preferencesAlimentaires"
                value={formData.preferencesAlimentaires}
                onChange={handleChange}
                placeholder="Allergies, régimes spéciaux, etc."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (optionnel)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Un petit mot pour les mariés..."
                rows="4"
              />
            </div>

            <button type="submit" className="rsvp-submit">
              Confirmer ma présence
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default RSVP

