import React, { useEffect, useRef } from 'react'

const base = import.meta.env.BASE_URL || ''

const témoins = [
  { name: 'Soukayna', photo: `${base}images/Soukayna.jpg` },
  { name: 'Lucas', photo: `${base}images/lucas.jpg` },
  { name: 'Acil', photo: `${base}images/acil.jpg` },
  { name: 'Cécilia', photo: `${base}images/cecilia.png` },
]

const Témoins = () => {
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

    const cards = sectionRef.current?.querySelectorAll('.témoin-card')
    cards?.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="témoins" className="témoins" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Nos Témoins</h2>
        <div className="témoins-grid">
          {témoins.map((t, i) => (
            <div key={i} className="témoin-card">
              <div className="témoin-photo-wrap">
                <img src={t.photo} alt={t.name} className="témoin-photo" />
              </div>
              <h3 className="témoin-name">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Témoins
