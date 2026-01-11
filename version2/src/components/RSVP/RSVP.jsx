import React, { useState } from 'react'
import styles from './RSVP.module.css'

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    console.log('RSVP submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guests: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <section className={styles.rsvp}>
      <div className={styles.container}>
        <h2 className={styles.title}>RSVP</h2>
        <p className={styles.subtitle}>
          Votre présence nous tient à cœur. Merci de confirmer votre venue.
        </p>

        {submitted ? (
          <div className={styles.successMessage}>
            <p>Merci pour votre confirmation !</p>
            <p>Nous avons hâte de vous voir.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="attendance" className={styles.label}>
                Serez-vous présent(e) ? *
              </label>
              <select
                id="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionnez une option</option>
                <option value="yes">Oui, avec plaisir</option>
                <option value="no">Non, désolé(e)</option>
              </select>
            </div>

            {formData.attendance === 'yes' && (
              <div className={styles.formGroup}>
                <label htmlFor="guests" className={styles.label}>
                  Nombre d'invités
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className={styles.input}
                  min="1"
                  placeholder="1"
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message (optionnel)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows="4"
                placeholder="Un petit mot pour les mariés..."
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Confirmer
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default RSVP

