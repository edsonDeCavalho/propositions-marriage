import React, { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const TARGET_DATE = new Date('2027-03-26T00:00:00')

const Hero = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = TARGET_DATE - now
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <img src="/images/flowers/flower1.png" alt="" className={styles.flowerLeft} aria-hidden="true" />
      <img src="/images/flowers/flower2.png" alt="" className={styles.flowerRight} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.namesContainer}>
          <h1 className={styles.names}>
            <span className={styles.name}>Yannick</span>
            <span className={styles.ampersand}>&</span>
            <span className={styles.name}>Lydia</span>
          </h1>
        </div>
        <div className={styles.countdown}>
          <p className={styles.countdownLabel}>Plus que</p>
          <div className={styles.countdownGrid}>
            <span className={styles.countdownItem}><strong>{countdown.days}</strong> jours</span>
            <span className={styles.countdownItem}><strong>{countdown.hours}</strong> h</span>
            <span className={styles.countdownItem}><strong>{countdown.minutes}</strong> min</span>
            <span className={styles.countdownItem}><strong>{countdown.seconds}</strong> s</span>
          </div>
          <p className={styles.countdownDate}>avant le 26 Mars 2027</p>
        </div>
        <div className={styles.dateContainer}>
          <p className={styles.dateLabel}>Nous nous unissons</p>
          <p className={styles.date}>26 Mars 2027</p>
        </div>
        <div className={styles.decorativeLine}></div>
      </div>
    </section>
  )
}

export default Hero

