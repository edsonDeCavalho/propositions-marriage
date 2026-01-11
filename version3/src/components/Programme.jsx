import React from 'react'
import '../styles/Programme.css'

const Programme = () => {
  const events = [
    {
      time: '15h00',
      title: 'Cérémonie Civile',
      description: 'Cérémonie à la mairie en présence de nos proches',
      icon: '💒'
    },
    {
      time: '16h00',
      title: 'Cocktail de Bienvenue',
      description: 'Moment de convivialité avec rafraîchissements',
      icon: '🥂'
    },
    {
      time: '18h00',
      title: 'Dîner',
      description: 'Repas en compagnie de tous nos invités',
      icon: '🍽️'
    },
    {
      time: '21h00',
      title: 'Soirée Dansante',
      description: 'Fête et danse jusqu\'au bout de la nuit',
      icon: '🪩'
    }
  ]

  return (
    <section className="programme" id="programme">
      <div className="container">
        <h2 className="section-title">Programme de la Journée</h2>
        <div className="programme-timeline">
          {events.map((event, index) => (
            <div key={index} className="programme-item">
              <div className="programme-time">{event.time}</div>
              <div className="programme-icon">{event.icon}</div>
              <div className="programme-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programme

