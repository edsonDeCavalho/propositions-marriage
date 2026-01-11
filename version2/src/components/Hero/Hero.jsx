import React from 'react'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.namesContainer}>
          <h1 className={styles.names}>
            <span className={styles.name}>Yannick</span>
            <span className={styles.ampersand}>&</span>
            <span className={styles.name}>Lydia</span>
          </h1>
        </div>
        <div className={styles.dateContainer}>
          <p className={styles.dateLabel}>Nous nous unissons</p>
          <p className={styles.date}>15 Juin 2024</p>
        </div>
        <div className={styles.decorativeLine}></div>
      </div>
    </section>
  )
}

export default Hero

