import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Yannick & Lydia</h3>
            <p>Ensemble pour toujours</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>
              {/* Modifiez avec vos coordonnées */}
              📧 contact@yannick-lydia.fr<br />
              📞 +33 X XX XX XX XX
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <div className="footer-social">
              {/* Ajoutez vos liens sociaux */}
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Avec tout notre amour, Yannick & Lydia<br />
            <span className="footer-date">15 Juin 2024</span>
          </p>
          <p className="footer-thanks">
            Merci de partager ce moment si spécial avec nous ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

