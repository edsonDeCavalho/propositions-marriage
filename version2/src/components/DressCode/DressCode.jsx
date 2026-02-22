import React from 'react'
import styles from './DressCode.module.css'

const DressCode = () => {
  return (
    <section className={styles.dressCode} id="dress-code">
      <div className={styles.container}>
        <h2 className={styles.title}>Dress code</h2>
        <p className={styles.subtitle}>
          Une tenue élégante pour célébrer ensemble cette journée inoubliable.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>👔</div>
            <h3 className={styles.cardTitle}>Tenue recommandée</h3>
            <p className={styles.text}>
              Pour les hommes : costume ou tenue habillée.<br />
              Pour les femmes : robe de cocktail ou tenue élégante.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>🎨</div>
            <h3 className={styles.cardTitle}>Palette de couleurs</h3>
            <p className={styles.colorsLabel}>Pour les hommes</p>
            <div className={styles.swatches}>
              <span className={styles.swatch} style={{ backgroundColor: '#c5c6be' }} title="#c5c6be" />
              <span className={styles.swatch} style={{ backgroundColor: '#b79973' }} title="#b79973" />
            </div>
            <p className={styles.colorsLabel}>Pour les femmes</p>
            <div className={styles.swatches}>
              <span className={styles.swatch} style={{ backgroundColor: '#503a2d' }} title="#503a2d" />
              <span className={styles.swatch} style={{ backgroundColor: '#dbcbbc' }} title="#dbcbbc" />
              <span className={styles.swatch} style={{ backgroundColor: '#c09d9b' }} title="#c09d9b" />
              <span className={styles.swatch} style={{ backgroundColor: '#999f85' }} title="#999f85" />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>🌤️</div>
            <h3 className={styles.cardTitle}>Météo & confort</h3>
            <p className={styles.text}>
              Une partie de la journée se déroulera en extérieur : pensez à une
              petite veste et à des chaussures confortables.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>📸</div>
            <h3 className={styles.cardTitle}>Photos</h3>
            <p className={styles.text}>
              N&apos;hésitez pas à immortaliser ces moments et à partager vos photos
              avec nous.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode

