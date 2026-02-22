import React from 'react'
import Hero from '../Hero/Hero'
import OurStory from '../OurStory/OurStory'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import Lieu from '../Lieu/Lieu'
import DressCode from '../DressCode/DressCode'
import Témoins from '../Témoins/Témoins'
import RSVP from '../RSVP/RSVP'
import Gallery from '../Gallery/Gallery'
import styles from './MainContent.module.css'

const MainContent = () => {
  return (
    <div className={styles.mainContent}>
      <section>
        <Hero />
      </section>

      <section>
        <OurStory />
      </section>

      <section>
        <WeddingDetails />
      </section>

      <section>
        <Lieu />
      </section>

      <section>
        <DressCode />
      </section>

      <section>
        <Témoins />
      </section>

      <section>
        <RSVP />
      </section>

      <section>
        <Gallery />
      </section>
    </div>
  )
}

export default MainContent

