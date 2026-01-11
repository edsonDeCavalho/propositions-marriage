import React from 'react'
import styles from './Gallery.module.css'

const Gallery = () => {
  // Placeholder pour les images - à remplacer par de vraies images
  const placeholderImages = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.title}>Galerie</h2>
        <p className={styles.subtitle}>
          Nos moments précieux ensemble
        </p>

        <div className={styles.galleryGrid}>
          {placeholderImages.map((index) => (
            <div key={index} className={styles.galleryItem}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderText}>Photo {index}</span>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.comingSoon}>
          La galerie sera bientôt mise à jour avec nos plus beaux souvenirs.
        </p>
      </div>
    </section>
  )
}

export default Gallery

