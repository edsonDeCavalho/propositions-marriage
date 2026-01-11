import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaxSeal from '../WaxSeal/WaxSeal'
import styles from './EnvelopeIntro.module.css'

const EnvelopeIntro = ({ onEnvelopeOpen }) => {
  const [isSealOpen, setIsSealOpen] = useState(false)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

  const handleSealClick = () => {
    setIsSealOpen(true)
    setTimeout(() => {
      setIsEnvelopeOpen(true)
      setTimeout(() => {
        onEnvelopeOpen()
      }, 1400)
    }, 300)
  }

  return (
    <AnimatePresence>
      {!isEnvelopeOpen && (
        <motion.div
          className={styles.envelopeContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.envelope}>
            {/* Corps principal de l'enveloppe (rectangle) */}
            <div className={styles.envelopeBody}>
              <div className={styles.envelopeBodyTexture}></div>
            </div>

            {/* Rabats latéraux (gauche et droite) - visibles sous le rabat supérieur */}
            <div className={styles.sideFlapLeft}>
              <div className={styles.sideFlapLeftTexture}></div>
            </div>
            <div className={styles.sideFlapRight}>
              <div className={styles.sideFlapRightTexture}></div>
            </div>

            {/* Rabat supérieur triangulaire qui se replie vers le bas */}
            <motion.div
              className={styles.topFlap}
              animate={{
                rotateX: isEnvelopeOpen ? 150 : 0,
                y: isEnvelopeOpen ? 100 : 0,
                opacity: isEnvelopeOpen ? 0 : 1,
              }}
              style={{
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
              }}
              transition={{
                duration: 1.4,
                ease: [0.3, 0, 0.1, 1],
                delay: isSealOpen ? 0.4 : 0,
              }}
            >
              <div className={styles.topFlapTexture}></div>
              
              {/* Sceau de cire centré sur le rabat supérieur */}
              <div className={styles.sealOnFlap}>
                <WaxSeal onSealClick={handleSealClick} isOpen={isSealOpen} />
              </div>
            </motion.div>

            {/* Rabat inférieur */}
            <div className={styles.bottomFlap}>
              <div className={styles.bottomFlapTexture}></div>
            </div>

            {/* Contenu intérieur (lettre) */}
            <motion.div
              className={styles.letter}
              animate={{
                opacity: isEnvelopeOpen ? 0 : 0.9,
                scale: isEnvelopeOpen ? 0.95 : 1,
              }}
              transition={{ duration: 0.8, delay: isSealOpen ? 0.2 : 0 }}
            >
              <div className={styles.letterContent}>
                <div className={styles.letterLines}>
                  <div className={styles.letterLine}></div>
                  <div className={styles.letterLine}></div>
                  <div className={styles.letterLine}></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ombres et effets de profondeur */}
          <div className={styles.shadow}></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EnvelopeIntro
