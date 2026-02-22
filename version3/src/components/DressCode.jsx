import React from 'react'
import '../styles/DressCode.css'

const DressCode = () => {
  return (
    <section className="dress-code" id="dress-code">
      <div className="container">
        <h2 className="section-title">Que Prévoir ?</h2>
        <div className="dress-code-content">
          <div className="dress-code-card">
            <div className="dress-code-icon">👔</div>
            <h3>Dress Code</h3>
            <p>
              Tenue élégante et raffinée.<br />
              Éviter le blanc (réservé à la mariée).
            </p>
          </div>

          <div className="dress-code-card dress-code-colors">
            <div className="dress-code-icon">🎨</div>
            <h3>Palette de couleurs</h3>
            <p className="dress-code-colors-label">Pour les hommes</p>
            <div className="dress-code-swatches">
              <span className="dress-code-swatch" style={{ backgroundColor: '#c5c6be' }} title="#c5c6be" />
              <span className="dress-code-swatch" style={{ backgroundColor: '#b79973' }} title="#b79973" />
            </div>
            <p className="dress-code-colors-label">Pour les femmes</p>
            <div className="dress-code-swatches">
              <span className="dress-code-swatch" style={{ backgroundColor: '#503a2d' }} title="#503a2d" />
              <span className="dress-code-swatch" style={{ backgroundColor: '#dbcbbc' }} title="#dbcbbc" />
              <span className="dress-code-swatch" style={{ backgroundColor: '#c09d9b' }} title="#c09d9b" />
              <span className="dress-code-swatch" style={{ backgroundColor: '#999f85' }} title="#999f85" />
            </div>
          </div>
          
          <div className="dress-code-card">
            <div className="dress-code-icon">🌤️</div>
            <h3>Météo</h3>
            <p>
              La cérémonie se déroulera en partie en extérieur.<br />
              Pensez à prévoir une tenue adaptée à la saison.
            </p>
          </div>
          
          <div className="dress-code-card">
            <div className="dress-code-icon">📸</div>
            <h3>Photos</h3>
            <p>
              N'hésitez pas à prendre des photos et à les partager<br />
              avec le hashtag <strong>#YannickEtLydia2027</strong>
            </p>
          </div>
          
          <div className="dress-code-card">
            <div className="dress-code-icon">🎁</div>
            <h3>Cadeaux</h3>
            <p>
              Votre présence est le plus beau des cadeaux.<br />
              Si vous souhaitez nous faire plaisir, une liste de mariage<br />
              sera disponible prochainement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode

