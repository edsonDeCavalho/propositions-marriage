import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Info from './components/Info'
import Program from './components/Program'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Accommodation from './components/Accommodation'
import DressCode from './components/DressCode'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Story />
      <Info />
      <Program />
      <Gallery />
      <RSVP />
      <Accommodation />
      <DressCode />
      <Footer />
    </div>
  )
}

export default App

