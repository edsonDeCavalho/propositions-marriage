import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Yannick & Lydia</h3>
            <p>Merci de partager ce moment précieux avec nous</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p><span className="emoji">📧</span> contact@yannicklydia.fr</p>
            <p><span className="emoji">📞</span> +33 X XX XX XX XX</p>
          </div>
          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2027 Yannick & Lydia. Fait avec <span className="emoji">❤️</span> pour notre jour spécial.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

