import React, { useEffect, useRef } from 'react'

const Lieu = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) {
      const el = sectionRef.current
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const base = import.meta.env.BASE_URL || ''

  return (
    <section id="lieu" className="lieu" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Le Lieu</h2>
        <img src="/images/flowers/flower3.png" alt="" className="lieu-flower-deco" aria-hidden="true" />

        <div className="lieu-content lieu-content--ceremony">
          <div className="lieu-image">
            <img src={`${base}images/marie-choisie-leroi.webp`} alt="Mairie de Choisy-le-Roi - Cérémonie" />
          </div>
          <div className="lieu-info">
            <h3 className="lieu-name">Cérémonie — Mairie de Choisy-le-Roi</h3>
            <p className="lieu-intro">
              La cérémonie civile aura lieu à la mairie de Choisy-le-Roi.
            </p>
            <div className="lieu-address">
              <strong>Adresse</strong>
              <p>Pl. Gabriel Péri<br />94600 Choisy-le-Roi</p>
            </div>
          </div>
        </div>

        <div className="lieu-content">
          <div className="lieu-image">
            <img src={`${base}images/endroid.avif`} alt="L'Orangerie de l'Orée du Bois - Lieu du mariage" />
          </div>
          <div className="lieu-info">
            <h3 className="lieu-name">Réception — L&apos;Orangerie de l&apos;Orée du Bois</h3>
            <p className="lieu-intro">
              Un lieu de réception unique au cœur de la forêt de Rosny-sur-Seine, dans les Yvelines.
            </p>
            <div className="lieu-address">
              <strong>Adresse</strong>
              <p>D113<br />78710 Rosny-sur-Seine</p>
            </div>
            <p className="lieu-waze">
              Dans Waze, indiquer : <em>&laquo; L&apos;Orangerie de l&apos;Orée du Bois, Rosny sur Seine &raquo;</em>
            </p>
            <a
              href="https://www.lorangeriedeloreedubois.com/galerie"
              target="_blank"
              rel="noopener noreferrer"
              className="lieu-gallery-link"
            >
              Voir la galerie photos du lieu →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Lieu
