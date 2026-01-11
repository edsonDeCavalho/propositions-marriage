import './Timeline.css'

const Timeline = () => {
  const events = [
    { time: '16:00', title: 'Cérémonie', description: 'Échange des vœux dans le jardin' },
    { time: '17:00', title: 'Cocktail', description: 'Apéritif et photos de groupe' },
    { time: '18:00', title: 'Réception', description: 'Dîner et toasts' },
    { time: '21:00', title: 'Ouverture du bal', description: 'Première danse' },
    { time: '22:00', title: 'Soirée dansante', description: 'Musique et festivités' },
  ]

  return (
    <section className="timeline">
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Programme de la Journée</h2>
        <div className="timeline-container">
          {events.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-time">{event.time}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

