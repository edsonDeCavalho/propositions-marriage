import React, { useState } from 'react'

const MAX_ENFANTS = 10

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    attendance: '',
    plusUn: false,
    plusUnNom: '',
    plusUnRelation: '',
    dietary: '',
    hasEnfants: '',
    organiserSurprise: '',
    message: ''
  })
  const [enfants, setEnfants] = useState([]) // [{ prenom: '', age: '' }, ...]
  const [showSuccess, setShowSuccess] = useState(false)
  const [showSurprisePopup, setShowSurprisePopup] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis'
    if (!formData.attendance) newErrors.attendance = 'Veuillez indiquer votre présence'
    if (formData.plusUn) {
      if (!formData.plusUnNom.trim()) newErrors.plusUnNom = 'Le nom et prénom du +1 sont requis'
      if (!formData.plusUnRelation.trim()) newErrors.plusUnRelation = 'Merci de préciser la relation'
    }
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

  const RSVP_API = import.meta.env.VITE_RSVP_API_URL || 'http://localhost:8080'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitError(null)
    setSubmitting(true)
    const messagePlusUn =
      formData.plusUn && (formData.plusUnNom || formData.plusUnRelation)
        ? `\n+1 : ${formData.plusUnNom || ''}${formData.plusUnRelation ? ` (${formData.plusUnRelation})` : ''}`
        : ''
    const payload = {
      ...formData,
      enfants: formData.hasEnfants === 'oui' ? enfants : [],
      message: (formData.message || '') + messagePlusUn,
      organiserSurprise: formData.organiserSurprise === 'oui',
      version: 'version1'
    }
    try {
      const res = await fetch(`${RSVP_API}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Erreur envoi')
      const wantsSurprise = formData.organiserSurprise === 'oui'
      setShowSurprisePopup(wantsSurprise)
      setShowSuccess(true)
      if (!wantsSurprise) {
        setTimeout(() => {
          document.getElementById('rsvp-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    } catch (err) {
      setSubmitError('Votre message n\'a pas pu être envoyé. Réessayez ou contactez-nous par email.')
    } finally {
      setSubmitting(false)
    }
  }

  if (showSuccess && showSurprisePopup) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="rsvp-popup-overlay" onClick={() => setShowSurprisePopup(false)} aria-hidden="true" />
          <div className="rsvp-popup" role="dialog" aria-labelledby="rsvp-popup-title">
            <div className="success-icon">✓</div>
            <h3 id="rsvp-popup-title">Merci !</h3>
            <p>Votre confirmation a bien été reçue.</p>
            <p className="rsvp-popup-surprise">Les témoins vont vous contacter pour organiser une surprise.</p>
            <button type="button" className="btn-close-popup" onClick={() => setShowSurprisePopup(false)}>Fermer</button>
          </div>
        </div>
      </section>
    )
  }

  if (showSuccess) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="rsvp-success" id="rsvp-success">
            <div className="success-icon">✓</div>
            <h3>Merci !</h3>
            <p>Votre confirmation a bien été reçue. Nous avons hâte de vous voir !</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="container">
        <h2 className="section-title">Confirmez Votre Présence</h2>
        <p className="rsvp-subtitle">Votre présence rendra ce jour encore plus spécial</p>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom et Prénom * (attention orthographe exact)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderColor: errors.name ? '#e74c3c' : '' }}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Mail (optionnel)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.fr"
              style={{ borderColor: errors.email ? '#e74c3c' : '' }}
            />
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
              style={{ borderColor: errors.telephone ? '#e74c3c' : '' }}
            />
            {errors.telephone && <span className="form-error">{errors.telephone}</span>}
          </div>

          <div className="form-group">
            <label>Serez-vous présent(e) ? *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={handleChange}
                  required
                />
                <span>Oui, avec plaisir !</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={handleChange}
                  required
                />
                <span>Non, désolé(e)</span>
              </label>
            </div>
            {errors.attendance && <span className="form-error">{errors.attendance}</span>}
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
            {formData.plusUn && (
              <div className="plusun-block">
                <div className="enfant-row">
                  <input
                    type="text"
                    name="plusUnNom"
                    placeholder="Nom et prénom du +1"
                    value={formData.plusUnNom}
                    onChange={handleChange}
                    className={errors.plusUnNom ? 'input-error' : ''}
                  />
                  <select
                    name="plusUnRelation"
                    value={formData.plusUnRelation}
                    onChange={handleChange}
                    className={errors.plusUnRelation ? 'input-error' : ''}
                  >
                    <option value="">Relation avec vous</option>
                    <option value="Conjoint(e) / Partenaire">Conjoint(e) / Partenaire</option>
                    <option value="Ami(e)">Ami(e)</option>
                    <option value="Frère / Sœur">Frère / Sœur</option>
                    <option value="Parent">Parent</option>
                    <option value="Collègue">Collègue</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                {(errors.plusUnNom || errors.plusUnRelation) && (
                  <span className="form-error">
                    {errors.plusUnNom || errors.plusUnRelation}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dietary">Préférences alimentaires</label>
            <textarea
              id="dietary"
              name="dietary"
              rows="3"
              placeholder="Allergies, régimes spéciaux, végétarien, etc. (optionnel)"
              value={formData.dietary}
              onChange={handleChange}
              style={{ borderColor: errors.dietary ? '#e74c3c' : '' }}
            />
            {errors.dietary && <span className="form-error">{errors.dietary}</span>}
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
              rows="4"
              placeholder="Un petit mot pour les mariés..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Voulez-vous organiser une surprise ou quelque chose pour les mariés ?</label>
            <p className="rsvp-surprise-intro">
              Si vous souhaitez organiser une petite surprise, un discours, une animation ou tout autre joli secret pour notre mariage, vous pouvez nous l’indiquer ci-dessous.
              Nos témoins prendront contact avec vous afin de coordonner tout cela en toute discrétion.
            </p>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="organiserSurprise"
                  value="non"
                  checked={formData.organiserSurprise === 'non'}
                  onChange={handleChange}
                />
                <span>Non</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="organiserSurprise"
                  value="oui"
                  checked={formData.organiserSurprise === 'oui'}
                  onChange={handleChange}
                />
                <span>Oui</span>
              </label>
            </div>
          </div>

          {submitError && <p className="form-error" style={{ marginBottom: '1rem' }}>{submitError}</p>}
          <button type="submit" className="btn-submit" disabled={submitting}>{submitting ? 'Envoi…' : 'Confirmer'}</button>
        </form>
      </div>
    </section>
  )
}

export default RSVP
