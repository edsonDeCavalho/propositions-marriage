import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-floral-bg"></div>
      <div className="hero-content fade-in-on-scroll">
        <div className="hero-names">
          <h1 className="hero-name-first">Yannick</h1>
          <div className="hero-ampersand">&</div>
          <h1 className="hero-name-second">Lydia</h1>
        </div>
        <div className="hero-divider"></div>
        <p className="hero-date">15 Juin 2024</p>
        <p className="hero-subtitle">Nous avons le plaisir de partager ce moment avec vous</p>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero

