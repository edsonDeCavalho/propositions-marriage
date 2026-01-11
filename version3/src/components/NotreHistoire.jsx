import React from 'react'
import '../styles/NotreHistoire.css'

const NotreHistoire = () => {
  return (
    <section className="notre-histoire" id="notre-histoire">
      <div className="container">
        <h2 className="section-title">Notre Histoire</h2>
        <div className="histoire-content">
          <div className="histoire-text">
            <p className="histoire-intro">
              Deux cœurs, une seule âme. Notre histoire a commencé il y a quelques années 
              et chaque jour qui passe renforce notre amour et notre complicité.
            </p>
            <div className="histoire-timeline">
              <div className="timeline-item">
                <div className="timeline-icon">💕</div>
                <div className="timeline-content">
                  <h3>Notre Rencontre</h3>
                  <p>
                    {/* Modifiez ce texte avec votre propre histoire */}
                    Nous nous sommes rencontrés lors d'un événement spécial. 
                    Dès le premier regard, nous avons su que quelque chose de magique 
                    était en train de se passer.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">💍</div>
                <div className="timeline-content">
                  <h3>La Demande</h3>
                  <p>
                    {/* Modifiez ce texte avec votre propre histoire */}
                    Par une belle journée, dans un lieu qui nous est cher, 
                    nous avons décidé de dire "oui" pour la vie.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">👰‍🤵</div>
                <div className="timeline-content">
                  <h3>Notre Mariage</h3>
                  <p>
                    {/* Modifiez ce texte avec votre propre histoire */}
                    Aujourd'hui, nous sommes ravis de partager ce moment si spécial 
                    avec nos proches et de célébrer notre amour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotreHistoire

