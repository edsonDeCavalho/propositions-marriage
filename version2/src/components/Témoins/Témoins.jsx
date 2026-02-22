import React from 'react'
import styles from './Témoins.module.css'

const témoins = [
  {
    name: 'Prénom Nom',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    email: 'témoin1@exemple.fr',
    phone: '+33 6 12 34 56 78',
  },
  {
    name: 'Prénom Nom',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    email: 'témoin2@exemple.fr',
    phone: '+33 6 98 76 54 32',
  },
  {
    name: 'Prénom Nom',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    email: 'témoin3@exemple.fr',
    phone: '+33 6 11 22 33 44',
  },
  {
    name: 'Prénom Nom',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    email: 'témoin4@exemple.fr',
    phone: '+33 6 55 66 77 88',
  },
]

const Témoins = () => {
  return (
    <section className={styles.témoins} id="témoins">
      <div className={styles.container}>
        <h2 className={styles.title}>Nos Témoins</h2>
        <div className={styles.grid}>
          {témoins.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.photoWrap}>
                <img src={t.photo} alt={t.name} className={styles.photo} />
              </div>
              <h3 className={styles.name}>{t.name}</h3>
              <a href={`mailto:${t.email}`} className={styles.contact}>
                {t.email}
              </a>
              <a href={`tel:${t.phone.replace(/\s/g, '')}`} className={styles.contact}>
                {t.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Témoins
