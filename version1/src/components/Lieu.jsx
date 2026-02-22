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

  return (
    <section id="lieu" className="lieu" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Le Lieu</h2>
        <img src="/images/flowers/flower3.png" alt="" className="lieu-flower-deco" aria-hidden="true" />
        <div className="lieu-content">
          <div className="lieu-image">
            <img src="/images/endroid.avif" alt="L'Orangerie de l'Orée du Bois - Lieu du mariage" />
          </div>
          <div className="lieu-info">
            <h3 className="lieu-name">L&apos;Orangerie de l&apos;Orée du Bois</h3>
            <p className="lieu-intro">
              Un lieu de réception unique au cœur des 1000 hectares de la forêt de Rosny-sur-Seine, dans les Yvelines.
            </p>
            <div className="lieu-address">
              <strong>Adresse</strong>
              <p>D113<br />78710 Rosny-sur-Seine</p>
            </div>
            <p className="lieu-waze">
              Dans Waze, indiquer : <em>&laquo; L&apos;Orangerie de l&apos;Orée du Bois, Rosny sur Seine &raquo;</em>
            </p>
            <p className="lieu-desc">
              1 domaine, 3 espaces de réception : Le Petit Château, L&apos;Orangerie et La Grange. En cocktail 50 à 300 personnes ou plus, en dîner assis 50 à 200 ou plus. 55 couchages sur place, 200 de plus à proximité. Piscine sécurisée &amp; chauffée en saison. Événement clé en main ou location sèche.
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
