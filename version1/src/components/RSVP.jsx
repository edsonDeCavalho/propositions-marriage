import React, { useState } from 'react'

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    attendance: '',
    dietary: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (!formData.guests) newErrors.guests = 'Veuillez sélectionner le nombre d\'invités'
    if (!formData.attendance) newErrors.attendance = 'Veuillez indiquer votre présence'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Ici, vous pouvez ajouter l'envoi des données à un serveur
    console.log('Données RSVP:', formData)
    
    // Afficher le message de succès
    setShowSuccess(true)
    
    // Scroll vers le message de succès
    setTimeout(() => {
      const successElement = document.getElementById('rsvp-success')
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
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
            <label htmlFor="name">Nom et Prénom *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderColor: errors.name ? '#e74c3c' : '' }}
            />
            {errors.name && <span style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="guests">Nombre d'invités *</label>
            <select 
              id="guests" 
              name="guests" 
              value={formData.guests}
              onChange={handleChange}
              required
              style={{ borderColor: errors.guests ? '#e74c3c' : '' }}
            >
              <option value="">Sélectionnez...</option>
              <option value="1">1 personne</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
              <option value="5+">5 personnes ou plus</option>
            </select>
            {errors.guests && <span style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.guests}</span>}
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
            {errors.attendance && <span style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{errors.attendance}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="dietary">Préférences alimentaires</label>
            <textarea 
              id="dietary" 
              name="dietary" 
              rows="3" 
              placeholder="Allergies, régimes spéciaux, etc."
              value={formData.dietary}
              onChange={handleChange}
            ></textarea>
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
            ></textarea>
          </div>
          <button type="submit" className="btn-submit">Confirmer</button>
        </form>
      </div>
    </section>
  )
}

export default RSVP

