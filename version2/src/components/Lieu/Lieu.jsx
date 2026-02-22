import React from 'react'
import styles from './Lieu.module.css'

const Lieu = () => {
  return (
    <section className={styles.lieu} id="lieu">
      <div className={styles.container}>
        <h2 className={styles.title}>Le Lieu</h2>
        <img src="/images/flowers/flower3.png" alt="" className={styles.flowerDeco} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.imageWrap}>
            <img src="/images/endroid.avif" alt="L'Orangerie de l'Orée du Bois - Lieu du mariage" />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>L&apos;Orangerie de l&apos;Orée du Bois</h3>
            <p className={styles.intro}>
              Un lieu de réception unique au cœur des 1000 hectares de la forêt de Rosny-sur-Seine, dans les Yvelines.
            </p>
            <div className={styles.address}>
              <strong>Adresse</strong>
              <p>D113<br />78710 Rosny-sur-Seine</p>
            </div>
            <p className={styles.waze}>
              Dans Waze, indiquer : <em>&laquo; L&apos;Orangerie de l&apos;Orée du Bois, Rosny sur Seine &raquo;</em>
            </p>
            <p className={styles.desc}>
              1 domaine, 3 espaces de réception : Le Petit Château, L&apos;Orangerie et La Grange. En cocktail 50 à 300 personnes ou plus, en dîner assis 50 à 200 ou plus. 55 couchages sur place, 200 de plus à proximité. Piscine sécurisée &amp; chauffée en saison. Événement clé en main ou location sèche.
            </p>
            <a
              href="https://www.lorangeriedeloreedubois.com/galerie"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.galleryLink}
            >
              Voir la galerie photos du lieu →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Lieu
