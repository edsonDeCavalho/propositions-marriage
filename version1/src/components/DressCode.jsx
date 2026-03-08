import React, { useEffect, useRef } from 'react'

function hexToLuminance(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

const DRESSCODE_COLORS = [
  '#f3e9db', '#d7ccb6', '#c1cbb0', '#939780', '#736b54', '#343724',
  '#6f5c3e', '#859475', '#b3b697', '#e4e0d7', '#cbab84', '#e3d3ba',
  '#c0cebd', '#8fa187', '#6c805d', '#cfb3a5', '#998274', '#645445',
  '#b2b2a6', '#79826f', '#c09d9b', '#999f85', '#503a2d', '#fcf1df',
  '#dbcbbc', '#c5c6be', '#b79973',
]

const DressCode = () => {
  const dresscodeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cards = dresscodeRef.current?.querySelectorAll('.dresscode-swatch-card')
    cards?.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      card.style.transition = `opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="dresscode" className="dresscode" ref={dresscodeRef}>
      <div className="container">
        <h2 className="section-title">Dresscode</h2>
        <div className="dresscode-content">
          <div className="dresscode-card dresscode-colors">
            <div className="dresscode-icon">🎨</div>
            <h3>Palette de couleurs</h3>
            <p className="dresscode-subtitle">Inspirez-vous de ces teintes pour votre tenue</p>
            <div className="dresscode-swatches dresscode-swatches--cards">
              {DRESSCODE_COLORS.map((hex) => {
                const isLight = hexToLuminance(hex) > 0.55
                return (
                  <div
                    key={hex}
                    className="dresscode-swatch-card"
                    style={{
                      backgroundColor: hex,
                      color: isLight ? '#2c2c2c' : '#fff',
                    }}
                  >
                    <span className="dresscode-swatch-hex">{hex.toUpperCase()}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode

