import { useEffect } from 'react'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import WeddingDetails from './components/WeddingDetails'
import Timeline from './components/Timeline'
import PhotoGallery from './components/PhotoGallery'
import RSVP from './components/RSVP'
import PracticalInfo from './components/PracticalInfo'
import Closing from './components/Closing'
import FloatingFlorals from './components/FloatingFlorals'
import './styles/App.css'

function App() {
  useEffect(() => {
    // Animation au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="app">
      <FloatingFlorals />
      <Hero />
      <OurStory />
      <WeddingDetails />
      <Timeline />
      <PhotoGallery />
      <RSVP />
      <PracticalInfo />
      <Closing />
    </div>
  )
}

export default App

