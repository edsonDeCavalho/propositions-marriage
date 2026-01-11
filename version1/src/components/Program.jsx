import React, { useEffect, useRef } from 'react'

const Program = () => {
  const programRef = useRef(null)

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

    const items = programRef.current?.querySelectorAll('.program-item')
    items?.forEach(item => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="programme" className="program" ref={programRef}>
      <div className="container">
        <h2 className="section-title">Programme de la Journée</h2>
        <div className="program-timeline">
          <div className="program-item">
            <div className="program-time">14h30</div>
            <div className="program-content">
              <h3>Accueil des invités</h3>
              <p>Arrivée et installation à la mairie</p>
            </div>
          </div>
          <div className="program-item">
            <div className="program-time">15h00</div>
            <div className="program-content">
              <h3>Cérémonie civile</h3>
              <p>Échange des vœux à la mairie</p>
            </div>
          </div>
          <div className="program-item">
            <div className="program-time">16h00</div>
            <div className="program-content">
              <h3>Photos de groupe</h3>
              <p>Séance photo avec tous nos proches</p>
            </div>
          </div>
          <div className="program-item">
            <div className="program-time">16h30</div>
            <div className="program-content">
              <h3>Cocktail</h3>
              <p>Apéritif et animations au lieu de réception</p>
            </div>
          </div>
          <div className="program-item">
            <div className="program-time">19h00</div>
            <div className="program-content">
              <h3>Dîner</h3>
              <p>Repas de mariage et discours</p>
            </div>
          </div>
          <div className="program-item">
            <div className="program-time">22h00</div>
            <div className="program-content">
              <h3>Soirée dansante</h3>
              <p>Ouverture du bal et festivités jusqu'au bout de la nuit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Program

