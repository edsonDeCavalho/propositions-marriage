import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Info from './components/Info'
import Lieu from './components/Lieu'
import Témoins from './components/Témoins'
import RSVP from './components/RSVP'
import DressCode from './components/DressCode'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Story />
      <Info />
      <Lieu />
      <DressCode />
      <Témoins />
      <RSVP />
      <Footer />
    </div>
  )
}

export default App

