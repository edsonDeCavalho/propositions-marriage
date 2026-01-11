import React, { useEffect, useRef } from 'react'

const Story = () => {
  const storyRef = useRef(null)

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

    const timelineItems = storyRef.current?.querySelectorAll('.timeline-item')
    timelineItems?.forEach(item => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="histoire" className="story" ref={storyRef}>
      <div className="container">
        <h2 className="section-title">Notre Histoire</h2>
        <div className="story-content">
          <div className="story-text">
            <p className="story-intro">
              Notre histoire a commencé comme dans un conte de fées, où deux âmes se sont trouvées et ont su qu'elles étaient faites l'une pour l'autre.
            </p>
            <div className="story-timeline">
              <div className="timeline-item">
                <div className="timeline-icon">💕</div>
                <div className="timeline-content">
                  <h3>La Rencontre</h3>
                  <p>Nous nous sommes rencontrés lors d'une belle journée de printemps. Dès le premier regard, nous avons su que quelque chose de spécial allait se passer entre nous.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">🌹</div>
                <div className="timeline-content">
                  <h3>Les Premiers Pas</h3>
                  <p>Chaque moment passé ensemble a renforcé notre lien. Les rires, les aventures, les conversations jusqu'au bout de la nuit... tout nous rapprochait.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">💍</div>
                <div className="timeline-content">
                  <h3>La Demande</h3>
                  <p>Le moment est venu où nous avons décidé de faire de notre amour une promesse éternelle. C'est avec une joie immense que nous vous invitons à célébrer ce jour spécial avec nous.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" 
              alt="Yannick & Lydia"
              onLoad={(e) => e.target.style.opacity = '1'}
              style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story

