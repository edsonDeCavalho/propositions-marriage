import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './WaxSeal.module.css'

const WaxSeal = ({ onSealClick, isOpen }) => {
  const [isCracking, setIsCracking] = useState(false)

  const handleClick = () => {
    if (!isOpen && !isCracking) {
      setIsCracking(true)
      setTimeout(() => {
        onSealClick()
      }, 600)
    }
  }

  return (
    <motion.div
      className={styles.sealContainer}
      onClick={handleClick}
      animate={{
        rotate: isCracking ? [0, -5, 5, -3, 0] : 0,
        scale: isCracking ? [1, 1.05, 0.95, 1] : 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      style={{ cursor: isOpen ? 'default' : 'pointer' }}
    >
      <div className={styles.waxSeal}>
        <div className={`${styles.waxBase} ${isCracking ? styles.cracking : ''}`}>
          <div className={styles.waxShine}></div>
          <div className={styles.waxTexture}></div>
        </div>
        <div className={styles.monogram}>
          <span className={styles.initial}>Y</span>
          <span className={styles.ampersand}>&</span>
          <span className={styles.initial}>L</span>
        </div>
        {isCracking && (
          <motion.div
            className={styles.crack}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.crackLine1}></div>
            <div className={styles.crackLine2}></div>
            <div className={styles.crackLine3}></div>
          </motion.div>
        )}
      </div>
      {!isOpen && (
        <motion.div
          className={styles.clickHint}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Cliquez sur le sceau
        </motion.div>
      )}
    </motion.div>
  )
}

export default WaxSeal

