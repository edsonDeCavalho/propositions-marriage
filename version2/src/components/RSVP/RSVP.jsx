import React, { useState } from 'react'
import styles from './RSVP.module.css'

const MAX_ENFANTS = 10

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    attendance: '',
    plusUn: false,
    preferencesAlimentaires: '',
    hasEnfants: '',
    message: '',
  })

  const [enfants, setEnfants] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleEnfantChange = (index, field, value) => {
    setEnfants(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addEnfant = () => {
    if (enfants.length >= MAX_ENFANTS) return
    setEnfants(prev => [...prev, { prenom: '', age: '' }])
  }

  const removeEnfant = (index) => {
    setEnfants(prev => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis'
    if (!formData.attendance) newErrors.attendance = 'Veuillez indiquer votre présence'
    if (!formData.preferencesAlimentaires?.trim()) newErrors.preferencesAlimentaires = 'Les préférences alimentaires sont requises'
    if (!formData.hasEnfants) newErrors.hasEnfants = 'Veuillez indiquer si vous avez des enfants'
    if (formData.hasEnfants === 'oui') {
      if (enfants.length === 0) {
        newErrors.enfants = 'Veuillez ajouter au moins un enfant (prénom et âge).'
      } else {
        enfants.forEach((e, i) => {
          if (!e.prenom?.trim() || !e.age?.trim()) {
            newErrors[`enfant_${i}`] = 'Prénom et âge requis'
          }
        })
      }
    }
    return newErrors
  }

  const RSVP_API = import.meta.env.VITE_RSVP_API_URL || 'http://localhost:3001'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitError(null)
    setSubmitting(true)
    const payload = { ...formData, enfants: formData.hasEnfants === 'oui' ? enfants : [], version: 'version2' }
    try {
      const res = await fetch(`${RSVP_API}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Erreur envoi')
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          telephone: '',
          attendance: '',
          plusUn: false,
          preferencesAlimentaires: '',
          hasEnfants: '',
          message: '',
        })
        setEnfants([])
      }, 3000)
    } catch (err) {
      setSubmitError('Votre message n\'a pas pu être envoyé. Réessayez ou contactez-nous.')
    } finally {
      setSubmitting(false)
    }
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
              <label htmlFor="name" className={styles.label}>Nom complet *</label>
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
              {errors.name && <span className={styles.formError}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Mail *</label>
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
              {errors.email && <span className={styles.formError}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telephone" className={styles.label}>Téléphone *</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="06 12 34 56 78"
              />
              {errors.telephone && <span className={styles.formError}>{errors.telephone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="attendance" className={styles.label}>Serez-vous présent(e) ? *</label>
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
              {errors.attendance && <span className={styles.formError}>{errors.attendance}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="plusUn"
                  checked={formData.plusUn}
                  onChange={handleChange}
                />
                <span>J'ajoute un +1</span>
              </label>
              <p className={styles.notice}>
                Sans décision préalable des mariés, le +1 sera à confirmer par les mariés.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="preferencesAlimentaires" className={styles.label}>Préférences alimentaires *</label>
              <textarea
                id="preferencesAlimentaires"
                name="preferencesAlimentaires"
                value={formData.preferencesAlimentaires}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
                placeholder="Allergies, régimes spéciaux, végétarien, etc."
                required
              />
              {errors.preferencesAlimentaires && <span className={styles.formError}>{errors.preferencesAlimentaires}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Avez-vous des enfants ? *</label>
              <div className={styles.radioRow}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasEnfants"
                    value="non"
                    checked={formData.hasEnfants === 'non'}
                    onChange={handleChange}
                  />
                  <span>Non</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasEnfants"
                    value="oui"
                    checked={formData.hasEnfants === 'oui'}
                    onChange={handleChange}
                  />
                  <span>Oui</span>
                </label>
              </div>
              {errors.hasEnfants && <span className={styles.formError}>{errors.hasEnfants}</span>}
              {formData.hasEnfants === 'oui' && (
                <div className={styles.enfantsBlock}>
                  <p className={styles.enfantsInfo}>Prénom et âge de chaque enfant (maximum {MAX_ENFANTS})</p>
                  {enfants.map((enfant, index) => (
                    <div key={index} className={styles.enfantRow}>
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={enfant.prenom}
                        onChange={(e) => handleEnfantChange(index, 'prenom', e.target.value)}
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Âge"
                        value={enfant.age}
                        onChange={(e) => handleEnfantChange(index, 'age', e.target.value)}
                        className={styles.input}
                      />
                      <button type="button" className={styles.btnRemoveEnfant} onClick={() => removeEnfant(index)} aria-label="Retirer">−</button>
                    </div>
                  ))}
                  {errors.enfants && <span className={styles.formError}>{errors.enfants}</span>}
                  {enfants.length < MAX_ENFANTS && (
                    <button type="button" className={styles.btnAddEnfant} onClick={addEnfant}>
                      + Ajouter un enfant
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message (optionnel)</label>
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

            {submitError && <span className={styles.formError}>{submitError}</span>}
            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? 'Envoi…' : 'Confirmer'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default RSVP
