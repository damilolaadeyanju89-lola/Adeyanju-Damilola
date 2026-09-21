import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";
import meImage from "./assets/me.jpg";
import OrbitalScene from "./components/OrbitalScene";
import GrowthChart from "./components/GrowthChart";
import WorksPage from "./components/WorksPage";

const projects = [
  {
    title: "GrâceLuxe Perfume",
    category: "Luxury E-commerce Experience",
    description:
      "A refined fragrance experience showcasing artisan-crafted perfumes, natural ingredients and a timeless luxury collection.",
    url: "https://perfume-black-iota.vercel.app/",
    image: "/port6.JPG",
  },
  {
    title: "LuxeLips",
    category: "Beauty E-commerce Experience",
    description:
      "A polished beauty storefront for luxurious lipsticks, featuring curated collections, featured shades and an interactive beauty journey.",
    url: "https://luxelip.netlify.app/",
    image: "/port2.JPG",
  },
  {
    title: "Routine Reminder",
    category: "Interactive Web App",
    description:
      "A productivity-focused web experience designed around reminders, routines and a clean interactive interface.",
    url: "https://routinereminderapp.netlify.app/",
    image: "/port1.JPG",
  },
  {
    title: "Interior Designs",
    category: "Furniture E-commerce Experience",
    description:
      "A modern furniture and decor experience featuring stylish home collections, best-selling products and curated interior categories.",
    url: "https://furniture-website-phi-one.vercel.app/",
    image: "/port4.JPG",
  },
];

function App() {
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroText = useRef<HTMLParagraphElement>(null);
  const heroButtons = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.pathname === "/works" || window.location.pathname === "/works/") {
      return;
    }

    const intro = gsap.timeline();

    intro
      .fromTo(
        heroTitle.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        }
      )
      .fromTo(
        heroText.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7"
      )
      .fromTo(
        heroButtons.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        "-=0.5"
      );
  }, []);

  if (window.location.pathname === "/works" || window.location.pathname === "/works/") {
    return <WorksPage />;
  }

  return (
    <main>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#top" className="logo">
          AD<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="mailto:damilolaadeyanju89@gmail.com?subject=Portfolio%20inquiry&body=Hi%20Damilola%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20project." className="nav-contact">
          Let's talk ↑
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-background">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>
          <div className="grid"></div>
        </div>

        <div className="hero-content">
          <p className="eyebrow">FRONTEND DEVELOPER • 3D ANIMATOR</p>

          <h1 ref={heroTitle}>
            I build digital
            <br />
            <span>experiences</span>
            <br />
            that move.
          </h1>

          <p ref={heroText} className="hero-description">
            I create responsive, interactive and visually intelligent digital
            experiences where design, technology and motion come together.
          </p>

          <div ref={heroButtons} className="hero-buttons">
            <a href="#work" className="primary-button">
              Explore my work <span>↓</span>
            </a>

            <a href="#contact" className="secondary-button">
              Contact me
            </a>
          </div>
        </div>

        <div className="hero-orbital" aria-hidden="true">
          <OrbitalScene />
        </div>

        <div className="scroll-indicator">
          <span></span>
          Scroll to explore
        </div>

      </section>

      {/* MARQUEE */}
      <section className="marquee">
        <div className="marquee-track">
          <span>FRONTEND DEVELOPMENT</span>
          <span>CREATIVE DEVELOPMENT</span>
          <span>UI / UX</span>
          <span>3D & MOTION</span>
          <span>FRONTEND DEVELOPMENT</span>
          <span>CREATIVE DEVELOPMENT</span>
        </div>
      </section>

      {/* WORK */}
      <section className="section work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="section-label">SELECTED WORK</p>
            <h2>
              Things I've
              <br />
              <em>built.</em>
            </h2>
          </div>

          <p className="section-intro">
            A selection of interfaces, websites and interactive experiences
            I've created while exploring the possibilities of frontend
            development.
          </p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project"
              key={project.title}
            >
              <div className="project-visual">
                <img src={project.image} alt={`${project.title} project preview`} />

                <span className="project-arrow">↗</span>
              </div>

              <div className="project-info">
                <div>
                  <span className="project-category">{project.category}</span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <span className="view-project">View project ↗</span>
              </div>
            </a>
          ))}
        </div>

        <a href="/works" className="see-more-works">
          See more works <span>↑</span>
        </a>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="section-label">ABOUT ME</div>

        <div className="about-content">
          <div className="about-heading">
            <h2>
              Turning ideas into
              <br />
              <em>digital experiences.</em>
            </h2>

            <div className="about-image">
              <img src={meImage} alt="Damilola Adeyanju, frontend developer and 3D animator" />
              <span>ADEYANJU DAMILOLA / FRONTEND DEVELOPER</span>
            </div>
          </div>

          <div className="about-text">
            <p>
              Hi, I’m Damilola, a Frontend Developer with a focus on creating
              responsive, interactive, and visually engaging web experiences.
            </p>

            <p>
              I enjoy turning ideas and designs into polished digital
              experiences, with a particular interest in combining strong
              frontend development with 3D animation and motion. My approach
              is centered on creating interfaces that are functional,
              well-structured, and engaging to use.
            </p>

            <a href="#contact" className="text-link">
              Let's create something ↑
            </a>

            <a
              href="/ADEYANJU-DAMILOLA-CV.pdf"
              download="ADEYANJU-DAMILOLA-CV.pdf"
              className="text-link cv-link"
            >
              Download my CV ↓
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section skills-section" id="skills">
        <div className="skills-intro">
          <div>
            <div className="section-label">SKILLS & TOOLS</div>
            <h2>
              Skills I <em>Work With</em>
            </h2>
          </div>

          <p>
            A combination of modern technologies and creative tools that help
            me build, design and bring ideas to life.
          </p>
        </div>

        <div className="skills-grid">
          <article className="skill-card">
            <div className="skill-card-top">
              <span className="skill-icon" aria-hidden="true">&lt;/&gt;</span>
              <span className="skill-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>Frontend Development</h3>
            <p>Building responsive and interactive web experiences with clean code and modern frameworks.</p>
            <div className="skill-chips">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>React</span><span>Tailwind</span><span>Three.js</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-top">
              <span className="skill-icon" aria-hidden="true">◌</span>
              <span className="skill-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>3D Animation Tools</h3>
            <p>Creating immersive 3D scenes, animated objects and expressive motion for digital experiences.</p>
            <div className="skill-chips">
              <span>Blender</span><span>Three.js</span><span>GSAP</span><span>CapCut</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-top">
              <span className="skill-icon" aria-hidden="true">✦</span>
              <span className="skill-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>Design &amp; Creative Tools</h3>
            <p>Designing beautiful interfaces and creating engaging visual content and animations.</p>
            <div className="skill-chips">
              <span>Figma</span><span>Canva</span><span>Blender</span><span>CapCut</span><span>GSAP</span><span>Three.js</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-top">
              <span className="skill-icon" aria-hidden="true">⌘</span>
              <span className="skill-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>Other Tools &amp; Platforms</h3>
            <p>Tools that keep me productive, collaborative and always moving forward.</p>
            <div className="skill-chips">
              <span>GitHub</span><span>VS Code</span><span>Netlify</span><span>Prettier</span><span>Cloud</span>
            </div>
          </article>
        </div>

        <div className="learning-strip">
          <span className="learning-mark" aria-hidden="true">↑</span>
          <div className="learning-copy">
            <h3>Always Learning</h3>
            <p>Exploring new tools, improving my skills and staying current with thoughtful digital work.</p>
          </div>
          <div className="learning-tags">
            <span>Responsive Design</span><span>API Integration</span><span>UI/UX</span><span>Performance</span><span>Problem Solving</span><span>Team Collaboration</span>
          </div>
          <span className="learning-arrow" aria-hidden="true">→</span>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section experience-section">
        <div className="section-label">EXPERIENCE</div>

        <GrowthChart />

        <div className="experience-item">
          <div className="experience-role">
            <h3>Frontend Developer Intern</h3>
            <p className="company">Quonote Enterprise</p>
          </div>

          <div className="experience-copy">
            <p>
              Building responsive interfaces, implementing frontend features
              and translating design concepts into functional web experiences.
            </p>
          </div>

          <span className="experience-arrow">↗</span>
        </div>

        <div className="experience-item">
          <div className="experience-role">
            <h3>Creative Frontend Developer</h3>
            <p className="company">Independent Projects</p>
          </div>

          <div className="experience-copy">
            <p>
              Designing and developing experimental interfaces, animated
              authentication pages, brand websites and interactive frontend
              experiences.
            </p>
          </div>

          <span className="experience-arrow">↗</span>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-section" id="contact">
        <div className="contact-glow"></div>

        <h2>
          Have an idea?
          <br />
          <em>Let's build it.</em>
        </h2>

        <p className="contact-description">
          I'm always interested in creating thoughtful, interactive and
          visually engaging digital experiences.
        </p>

        <a
          href="mailto:damilolaadeyanju89@gmail.com?subject=Portfolio%20inquiry&body=Hi%20Damilola%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20project."
          className="contact-button"
        >
          Start a conversation ↑
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <strong>AD<span>.</span></strong>
          <p>Frontend Developer &amp; 3D Animator</p>
        </div>

        <div className="footer-links">
          <a href="#top">Back to top ↑</a>
          <a
            href="https://github.com/damilolaadeyanju89-lola"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link github-link"
          >
            <span className="footer-social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.59 2.35 1.13 2.92.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.15c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9v1.41c0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
              </svg>
            </span>
            GitHub ↑
          </a>
          <a
            href="https://www.linkedin.com/in/adeyanju-damilola-1ba754309"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link linkedin-link"
          >
            <span className="footer-social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M5.2 7.1A1.8 1.8 0 1 0 5.2 3.5a1.8 1.8 0 0 0 0 3.6ZM3.7 20.5h3V9h-3v11.5ZM8.8 9v11.5h3v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.85 1.71 1.85 3.05v5.59h3V14.2c0-3.1-.67-5.48-4.29-5.48-1.74 0-2.91.96-3.39 1.87h-.04V9H8.8Z" />
              </svg>
            </span>
            LinkedIn ↑
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link instagram-link"
          >
            <span className="footer-social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                <circle cx="12" cy="12" r="4.1" />
                <circle cx="17.4" cy="6.7" r="1" className="instagram-dot" />
              </svg>
            </span>
            Instagram ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;