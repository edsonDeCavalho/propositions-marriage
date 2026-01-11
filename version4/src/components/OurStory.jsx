import './OurStory.css'

const OurStory = () => {
  return (
    <section className="our-story">
      <div className="section-floral-decoration top"></div>
      <div className="section-content fade-in-on-scroll">
        <h2 className="section-title">Notre Histoire</h2>
        <div className="story-content">
          <p className="story-text">
            Tout a commencé par un regard, un sourire, puis une conversation qui n'en finissait plus.
            Depuis ce jour, chaque moment passé ensemble a été une nouvelle page de notre histoire d'amour.
          </p>
          <p className="story-text">
            Aujourd'hui, nous sommes ravis de célébrer notre union et de partager cette joie avec ceux qui nous sont chers.
            Votre présence à nos côtés rendra ce jour encore plus magique.
          </p>
        </div>
        <div className="story-hearts">💕</div>
      </div>
      <div className="section-floral-decoration bottom"></div>
    </section>
  )
}

export default OurStory

