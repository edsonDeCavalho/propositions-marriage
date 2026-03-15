import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lydia & Yannick</h3>
            <p>Merci de partager ce moment précieux avec nous</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p><span className="emoji">📧</span> <a href="mailto:lydiayannick0327@gmail.com" className="footer-contact-link">lydiayannick0327@gmail.com</a></p>
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
          <p>&copy; 2027 Lydia & Yannick. Fait avec <span className="emoji">❤️</span> pour notre jour spécial.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

