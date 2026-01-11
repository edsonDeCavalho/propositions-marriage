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
              {/* Modifiez selon vos préférences */}
              Tenue élégante et raffinée<br />
              Couleurs douces et pastels appréciées<br />
              Éviter le blanc et le noir strict
            </p>
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
              avec le hashtag <strong>#YannickEtLydia2024</strong>
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

