import React, { useState } from 'react'
import '../styles/RSVP.css'

const MAX_ENFANTS = 10

const RSVP = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    plusUn: false,
    preferencesAlimentaires: '',
    hasEnfants: '',
    message: ''
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
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const payload = {
      ...formData,
      enfants: formData.hasEnfants === 'oui' ? enfants : []
    }
    console.log('Données RSVP:', payload)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        plusUn: false,
        preferencesAlimentaires: '',
        hasEnfants: '',
        message: ''
      })
      setEnfants([])
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
              {errors.nom && <span className="form-error">{errors.nom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre.email@exemple.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone *</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                placeholder="06 12 34 56 78"
              />
              {errors.telephone && <span className="form-error">{errors.telephone}</span>}
            </div>

            <div className="form-group form-group-plus-un">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="plusUn"
                  checked={formData.plusUn}
                  onChange={handleChange}
                />
                <span>J'ajoute un +1</span>
              </label>
              <p className="rsvp-notice">
                Sans décision préalable des mariés, le +1 sera à confirmer par les mariés.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="preferencesAlimentaires">Préférences alimentaires *</label>
              <textarea
                id="preferencesAlimentaires"
                name="preferencesAlimentaires"
                value={formData.preferencesAlimentaires}
                onChange={handleChange}
                placeholder="Allergies, régimes spéciaux, végétarien, etc."
                rows="3"
                required
              />
              {errors.preferencesAlimentaires && <span className="form-error">{errors.preferencesAlimentaires}</span>}
            </div>

            <div className="form-group">
              <label>Avez-vous des enfants ? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="hasEnfants"
                    value="non"
                    checked={formData.hasEnfants === 'non'}
                    onChange={handleChange}
                  />
                  <span>Non</span>
                </label>
                <label className="radio-label">
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
              {errors.hasEnfants && <span className="form-error">{errors.hasEnfants}</span>}
              {formData.hasEnfants === 'oui' && (
                <div className="enfants-block">
                  <p className="enfants-info">Prénom et âge de chaque enfant (maximum {MAX_ENFANTS})</p>
                  {enfants.map((enfant, index) => (
                    <div key={index} className="enfant-row">
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={enfant.prenom}
                        onChange={(e) => handleEnfantChange(index, 'prenom', e.target.value)}
                        className={errors[`enfant_${index}`] ? 'input-error' : ''}
                      />
                      <input
                        type="text"
                        placeholder="Âge"
                        value={enfant.age}
                        onChange={(e) => handleEnfantChange(index, 'age', e.target.value)}
                        className={errors[`enfant_${index}`] ? 'input-error' : ''}
                      />
                      <button type="button" className="btn-remove-enfant" onClick={() => removeEnfant(index)} aria-label="Retirer">−</button>
                    </div>
                  ))}
                  {errors.enfants && <span className="form-error">{errors.enfants}</span>}
                  {enfants.length < MAX_ENFANTS && (
                    <button type="button" className="btn-add-enfant" onClick={addEnfant}>
                      + Ajouter un enfant
                    </button>
                  )}
                </div>
              )}
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

            {submitError && <span className="form-error" style={{ display: 'block', marginBottom: '1rem' }}>{submitError}</span>}
            <button type="submit" className="rsvp-submit" disabled={submitting}>
              {submitting ? 'Envoi…' : 'Confirmer ma présence'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default RSVP
