import React from 'react'
import styles from './OurStory.module.css'

const OurStory = () => {
  return (
    <section className={styles.ourStory}>
      <div className={styles.container}>
        <h2 className={styles.title}>Notre Histoire</h2>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              C'est dans un moment de grâce que nos chemins se sont croisés, 
              comme deux étoiles qui se rencontrent dans la vaste étendue du ciel.
            </p>
            <p className={styles.paragraph}>
              Chaque jour passé ensemble a été une page de notre livre d'amour, 
              écrite avec tendresse, rires partagés et moments précieux.
            </p>
            <p className={styles.paragraph}>
              Aujourd'hui, nous sommes heureux de vous inviter à célébrer avec nous 
              le début d'un nouveau chapitre, celui où nos deux cœurs ne font plus qu'un.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory

