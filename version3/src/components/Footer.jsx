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
              <span className="emoji">📧</span> contact@yannick-lydia.fr<br />
              <span className="emoji">📞</span> +33 X XX XX XX XX
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
            <span className="footer-date">26 Mars 2027</span>
          </p>
          <p className="footer-thanks">
            Merci de partager ce moment si spécial avec nous <span className="emoji">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

