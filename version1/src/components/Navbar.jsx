import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const target = document.querySelector(targetId)
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <div className="nav-logo">Y & L</div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <li><a href="#accueil" className="nav-link" onClick={(e) => handleNavClick(e, '#accueil')}>Accueil</a></li>
          <li><a href="#histoire" className="nav-link" onClick={(e) => handleNavClick(e, '#histoire')}>Notre Histoire</a></li>
          <li><a href="#infos" className="nav-link" onClick={(e) => handleNavClick(e, '#infos')}>Infos</a></li>
          <li><a href="#programme" className="nav-link" onClick={(e) => handleNavClick(e, '#programme')}>Programme</a></li>
          <li><a href="#galerie" className="nav-link" onClick={(e) => handleNavClick(e, '#galerie')}>Galerie</a></li>
        </ul>
        <a href="#rsvp" className="nav-rsvp-btn" onClick={(e) => handleNavClick(e, '#rsvp')}>RSVP</a>
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          id="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

