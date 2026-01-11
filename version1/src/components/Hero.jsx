import React, { useEffect } from 'react'

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const heroImage = document.querySelector('.hero-image')
      if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStory = () => {
    const target = document.querySelector('#histoire')
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="accueil" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-name">Yannick</span>
          <span className="hero-ampersand">&</span>
          <span className="hero-name">Lydia</span>
        </h1>
        <p className="hero-tagline">Deux cœurs, une seule âme</p>
        <div className="hero-date">
          <span className="date-day">15</span>
          <span className="date-month">Juin</span>
          <span className="date-year">2024</span>
        </div>
        <div className="hero-scroll" onClick={scrollToStory}>
          <span>Découvrez notre histoire</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      <div 
        className="hero-image" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')" }}
      ></div>
    </section>
  )
}

export default Hero

