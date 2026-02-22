import React from 'react'
import styles from './WeddingDetails.module.css'

const WeddingDetails = () => {
  return (
    <section className={styles.weddingDetails}>
      <div className={styles.container}>
        <h2 className={styles.title}>Détails du Mariage</h2>
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <div className={styles.icon}>📅</div>
            <h3 className={styles.detailTitle}>Date</h3>
            <p className={styles.detailText}>Samedi 26 Mars 2027</p>
            <p className={styles.detailSubtext}>À partir de 16h00</p>
          </div>

          <div className={styles.detailCard}>
            <div className={styles.icon}>⏰</div>
            <h3 className={styles.detailTitle}>Programme</h3>
            <div className={styles.programme}>
              <p className={styles.programmeItem}>
                <span className={styles.programmeTime}>16h00</span>
                <span className={styles.programmeEvent}>Cérémonie</span>
              </p>
              <p className={styles.programmeItem}>
                <span className={styles.programmeTime}>17h30</span>
                <span className={styles.programmeEvent}>Cocktail</span>
              </p>
              <p className={styles.programmeItem}>
                <span className={styles.programmeTime}>19h30</span>
                <span className={styles.programmeEvent}>Dîner</span>
              </p>
              <p className={styles.programmeItem}>
                <span className={styles.programmeTime}>22h00</span>
                <span className={styles.programmeEvent}>Soirée dansante</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeddingDetails

