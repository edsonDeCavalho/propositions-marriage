import React from 'react'
import Hero from './components/Hero'
import NotreHistoire from './components/NotreHistoire'
import InfosPratiques from './components/InfosPratiques'
import Lieu from './components/Lieu'
import Programme from './components/Programme'
import Témoins from './components/Témoins'
import Galerie from './components/Galerie'
import RSVP from './components/RSVP'
import CarteHebergement from './components/CarteHebergement'
import DressCode from './components/DressCode'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <NotreHistoire />
      <InfosPratiques />
      <Lieu />
      <Programme />
      <Témoins />
      <Galerie />
      <RSVP />
      <CarteHebergement />
      <DressCode />
      <Footer />
    </div>
  )
}

export default App

