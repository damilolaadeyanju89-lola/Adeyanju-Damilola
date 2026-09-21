const additionalWorks = [
  {
    title: "Jigsaw Auth",
    category: "3D Creative Frontend",
    description: "An experimental authentication interface featuring an animated jigsaw-inspired visual experience.",
    image: "/port3.JPG",
    url: "https://jigsawauthe.netlify.app/",
  },
  {
    title: "Glass Effect Login",
    category: "Authentication Experience",
    description: "A modern login interface built around a polished glassmorphism visual style and focused user flow.",
    image: "/port8.JPG",
    url: "https://login-with-glass-effect.vercel.app/",
  },
  {
    title: "Smoothie Website",
    category: "Creative Frontend",
    description: "A vibrant smoothie brand experience combining bold presentation with a smooth, engaging interface.",
    image: "/port7.JPG",
    url: "https://smoothie-website-sand.vercel.app/#",
  },
];

function ImageWithFallback({ image, alt }: { image: string; alt: string }) {
  return (
    <img
      src={image}
      alt={alt}
      onError={(event) => {
        const currentSource = event.currentTarget.src.toLowerCase();

        if (currentSource.endsWith(".jpg")) {
          event.currentTarget.src = image.replace(/\.[^.]+$/, ".jpeg");
        }
      }}
    />
  );
}

export default function WorksPage() {
  return (
    <main className="works-page">
      <nav className="navbar">
        <a href="/" className="logo">
          AD<span>.</span>
        </a>
        <a href="/" className="nav-contact">Back to portfolio ↗</a>
      </nav>

      <section className="section works-page-heading">
        <p className="section-label">MORE WORK</p>
        <h1>
          More things
          <br />
          <em>I've built.</em>
        </h1>
      </section>

      <section className="section more-projects">
        <div className="projects">
          {additionalWorks.map((project) => (
            <a className="project" href={project.url} key={project.image}>
              <div className="project-visual project-image-visual">
                <ImageWithFallback image={project.image} alt={project.title} />
                <span className="project-arrow">↗</span>
              </div>
              <div className="project-info">
                <div><span className="project-category">{project.category}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="view-project">View project ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-label">CONTACT</p>
        <h2>Have an idea?<br /><em>Let's build it.</em></h2>
        <a href="mailto:damilolaadeyanju89@gmail.com?subject=Portfolio%20inquiry&body=Hi%20Damilola%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20project." className="contact-button">Start a conversation ↗</a>
      </section>
    </main>
  );
}
