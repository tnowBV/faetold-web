import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const B = import.meta.env.BASE_URL.replace(/\/$/, '')

const CLASSES = [
  { key: 'barbarian', name: 'Barbarian', desc: 'A fierce warrior fueled by primal rage.' },
  { key: 'bard', name: 'Bard', desc: 'A magical minstrel whose music weaves power.' },
  { key: 'cleric', name: 'Cleric', desc: 'A divine champion wielding holy magic.' },
  { key: 'druid', name: 'Druid', desc: 'A nature priest commanding wild magic.' },
  { key: 'fighter', name: 'Fighter', desc: 'A master of martial combat and tactics.' },
  { key: 'paladin', name: 'Paladin', desc: 'A holy knight sworn to an oath.' },
  { key: 'ranger', name: 'Ranger', desc: 'A wilderness hunter and tracker.' },
  { key: 'rogue', name: 'Rogue', desc: 'A cunning scoundrel with deadly precision.' },
  { key: 'sorcerer', name: 'Sorcerer', desc: 'A spellcaster born with innate magic.' },
  { key: 'warlock', name: 'Warlock', desc: 'A wielder of power from a dark pact.' },
  { key: 'wizard', name: 'Wizard', desc: 'A scholarly mage of arcane knowledge.' },
]

const FEATURES = [
  {
    icon: '🎭',
    title: 'AI Dungeon Master',
    desc: 'An intelligent DM that adapts to your every decision, crafting a narrative uniquely yours.',
  },
  {
    icon: '⚔️',
    title: 'Tactical Combat',
    desc: 'Turn-based combat with real D&D mechanics — attack rolls, spell slots, saving throws, and more.',
  },
  {
    icon: '📜',
    title: 'Full 5e Spellcasting',
    desc: 'Hundreds of spells from the SRD with ritual casting, concentration, and component tracking.',
  },
  {
    icon: '🎒',
    title: 'Deep Inventory',
    desc: 'Manage weapons, armor, potions, packs, and spellcasting foci — all with real game effects.',
  },
  {
    icon: '🏰',
    title: 'Living Worlds',
    desc: 'Multiple campaign seeds with dynamic environments, weather, terrain, and day/night cycles.',
  },
  {
    icon: '📈',
    title: 'Character Progression',
    desc: 'Level up with ASI, expertise, new spells, subclass features, and more — all guided step by step.',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const SCREENSHOTS = [
  `${B}/assets/images/screenshots/IMG_7770.PNG`,
  `${B}/assets/images/screenshots/IMG_7801.PNG`,
  `${B}/assets/images/screenshots/IMG_7803.PNG`,
  `${B}/assets/images/screenshots/IMG_7804.PNG`,
  `${B}/assets/images/screenshots/IMG_7805.PNG`,
  `${B}/assets/images/screenshots/IMG_7824.PNG`,
  `${B}/assets/images/screenshots/IMG_7AB1E921B88C-1.PNG`,
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <img src={`${B}/assets/images/logo/logo.png`} alt="Faetold" className="navbar__logo-img" />
        </a>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#showcase" onClick={() => setMenuOpen(false)}>Adventure</a></li>
          <li><a href="#sustainability" onClick={() => setMenuOpen(false)}>Sustainability</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li><a href="#signup" className="navbar__cta">Get Notified</a></li>
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  const [heroSSIdx, setHeroSSIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHeroSSIdx(p => (p + 1) % SCREENSHOTS.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__content fade-up">
        <div className="hero__split">
          <div className="hero__left">
            <img src={`${B}/assets/images/logo/logo.png`} alt="Faetold" className="hero__title-img" />
            <p className="hero__subtitle">Coming Fall 2026</p>
            <p className="hero__tagline">
              An AI-powered D&D adventure in your pocket. Create your character, explore vast worlds,
              and let an intelligent Dungeon Master guide your story.
            </p>
            <div className="hero__actions">
              <a href="#features" className="btn btn--primary">Learn More</a>
            </div>
          </div>
          <div className="hero__phone">
            <div className="hero__phone-frame">
              <img src={`${B}/assets/images/containers/iphone.png`} alt="Faetold on iPhone" className="hero__phone-img" />
              <div className="hero__phone-screen">
                {SCREENSHOTS.map((src, i) => (
                  <img key={src} src={src} alt="" className={`hero__phone-ss ${i === heroSSIdx ? 'hero__phone-ss--active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint">
        <span>&#x25BE;</span>
      </div>
    </section>
  )
}

function FeatureCard({ f, i }) {
  const [ref, vis] = useInView(0.2)
  return (
    <div ref={ref} className={`feature-card ${vis ? 'feature-card--visible' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
      <span className="feature-card__icon">{f.icon}</span>
      <h3 className="feature-card__title">{f.title}</h3>
      <p className="feature-card__desc">{f.desc}</p>
    </div>
  )
}

function Features() {
  return (
    <section className="section features" id="features">
      <div className="section__inner">
        <h2 className="section__title">Forge Your Legend</h2>
        <p className="section__subtitle">Everything you need for a complete D&D experience, powered by AI.</p>
        <div className="features__grid">
          {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
        </div>
      </div>
    </section>
  )
}


function PhoneShowcase() {
  const [ref, vis] = useInView(0.2)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % SCREENSHOTS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section phone-showcase" id="showcase">
      <div className="section__inner phone-showcase__inner" ref={ref}>
        <div className={`phone-showcase__device ${vis ? 'phone-showcase__device--visible' : ''}`}>
          <div className="phone-showcase__frame">
            <img src={`${B}/assets/images/containers/iphone.png`} alt="Faetold on iPhone" className="phone-showcase__img" />
            <div className="phone-showcase__screen">
              {SCREENSHOTS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  className={`phone-showcase__screenshot ${i === activeIdx ? 'phone-showcase__screenshot--active' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="phone-showcase__dots">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                className={`phone-showcase__dot ${i === activeIdx ? 'phone-showcase__dot--active' : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className={`phone-showcase__text ${vis ? 'phone-showcase__text--visible' : ''}`}>
          <h2 className="section__title" style={{ textAlign: 'left' }}>Adventure Anywhere</h2>
          <p className="phone-showcase__desc">
            Faetold fits an entire D&D campaign into your pocket. From character creation
            to epic boss battles, every moment is crafted by an AI Dungeon Master that
            remembers your choices and adapts the world around you.
          </p>
          <ul className="phone-showcase__list">
            <li>Full character creation with 11 classes and 9 races</li>
            <li>Persistent world state with time, weather, and terrain</li>
            <li>Turn-based tactical combat with real dice rolls</li>
            <li>Equipment, spells, and inventory management</li>
            <li>Quest tracking and story progression</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function ClassCard({ c }) {
  const [ref, vis] = useInView(0.15)
  return (
    <div ref={ref} className={`class-card ${vis ? 'class-card--visible' : ''}`}>
      <div className="class-card__img-wrap">
        <img src={`${B}/assets/images/classes/${c.key}.png`} alt={c.name} className="class-card__img" loading="lazy" />
      </div>
      <h3 className="class-card__name">{c.name}</h3>
      <p className="class-card__desc">{c.desc}</p>
    </div>
  )
}

function MediaCard({ m, i }) {
  const [ref, vis] = useInView(0.2)
  return (
    <div ref={ref} className={`media-card ${vis ? 'media-card--visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
      <img src={m.src} alt={m.label} className="media-card__img" loading="lazy" />
      <div className="media-card__overlay">
        <span className="media-card__label">{m.label}</span>
      </div>
    </div>
  )
}

function Classes() {
  return (
    <section className="section classes" id="classes">
      <div className="section__inner">
        <h2 className="section__title">Choose Your Path</h2>
        <p className="section__subtitle">11 fully realized character classes, each with unique abilities, spells, and progression.</p>
        <div className="classes__carousel">
          {CLASSES.map((c) => <ClassCard key={c.key} c={c} />)}
        </div>
      </div>
    </section>
  )
}

function Media() {
  return (
    <section className="section media" id="media">
      <div className="section__inner">
        <h2 className="section__title">A World of Possibilities</h2>
        <p className="section__subtitle">Explore hand-crafted campaign seeds, each with a unique story to tell.</p>
        <div className="media__grid">
          {[
            { src: `${B}/assets/images/locations/castle.png`, label: 'Ancient Castles' },
            { src: `${B}/assets/images/locations/forest.png`, label: 'Enchanted Forests' },
            { src: `${B}/assets/images/locations/peaks.png`, label: 'Frozen Peaks' },
            { src: `${B}/assets/images/locations/town.png`, label: 'Bustling Towns' },
          ].map((m, i) => <MediaCard key={i} m={m} i={i} />)}
        </div>
      </div>
    </section>
  )
}

function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [ref, vis] = useInView(0.2)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/supportmaster@faetold.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          _subject: 'Faetold — New Email Signup',
          message: `New signup: ${trimmed}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section className="section email-signup" id="signup">
      <div className="section__inner" ref={ref}>
        <div className={`email-signup__card ${vis ? 'email-signup__card--visible' : ''}`}>
          <h2 className="section__title">Begin Your Quest</h2>
          <p className="section__subtitle" style={{ marginBottom: 24 }}>
            Faetold is coming Fall 2026 to iOS. Enter your email to be the first to know when it launches.
          </p>
          <form className="email-signup__form" onSubmit={handleSubmit}>
            <div className="email-signup__row">
              <input
                type="email"
                className="email-signup__input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                className="btn btn--primary email-signup__btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Signing up...' : status === 'success' ? 'You\'re in!' : 'Get Notified'}
              </button>
            </div>
            {status === 'success' && (
              <p className="email-signup__status email-signup__status--success">
                You're on the list! We'll let you know when Faetold launches.
              </p>
            )}
            {status === 'error' && (
              <p className="email-signup__status email-signup__status--error">
                Something went wrong. Please try again or email supportmaster@faetold.com directly.
              </p>
            )}
          </form>
          <p className="email-signup__privacy">We'll never share your email. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

function Sustainability() {
  const [ref, vis] = useInView(0.2)
  return (
    <section className="section sustainability" id="sustainability">
      <div className="section__inner" ref={ref}>
        <h2 className="section__title">AI Sustainability</h2>
        <p className="section__subtitle">We care about the environmental impact of the technology that powers Faetold.</p>
        <div className={`sustainability__card ${vis ? 'sustainability__card--visible' : ''}`}>
          <div className="sustainability__icon">🌿</div>
          <div className="sustainability__body">
            <p className="sustainability__text">
              Faetold is built on <strong>Google's Gemini AI</strong>, which runs on Google Cloud's infrastructure.
              Google has committed to carbon-neutral operations and matches 100% of its electricity consumption
              with renewable energy purchases, actively measuring and reporting on the environmental impact of their data centers.
            </p>
            <p className="sustainability__text" style={{ marginTop: 16 }}>
              To learn more about their approach to sustainable AI infrastructure, see Google's detailed report
              on measuring the environmental impact of AI inference.
            </p>
            <a
              href="https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--small"
              style={{ marginTop: 20 }}
            >
              Read the Report
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrivacyPolicy() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section className="section privacy" id="privacy">
      <div className="section__inner">
        <h2 className="section__title">Privacy Policy</h2>
        <p className="section__subtitle">Effective Date: March 21, 2026</p>
        <div className={`privacy__card ${expanded ? 'privacy__card--expanded' : ''}`}>
          <div className="privacy__section">
            <h3>1. Introduction</h3>
            <p>Faetold is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Service.</p>
          </div>
          <div className="privacy__section">
            <h3>2. Information We Collect</h3>
            <ul>
              <li>Account information: name, email address, and hashed password when you register.</li>
              <li>Character data: names, descriptions, choices, and other content you create.</li>
              <li>Third-party sign-in: if you sign in with Apple, we receive the email address provided by Apple's authentication service.</li>
              <li>Usage data: actions taken within the app, features used, error logs, and crash reports.</li>
            </ul>
          </div>
          {expanded && (
            <>
              <div className="privacy__section">
                <h3>3. How We Use Your Information</h3>
                <ul>
                  <li>Create and manage your account.</li>
                  <li>Operate and personalize game content and AI interactions.</li>
                  <li>Process in-app purchases.</li>
                  <li>Send transactional emails; promotional emails only if you opt in.</li>
                  <li>Detect and prevent fraud or prohibited activity.</li>
                  <li>Improve and develop the Service.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </div>
              <div className="privacy__section">
                <h3>4. How We Share Your Information</h3>
                <p>We do not sell, rent, or trade your personal information. We may share information with:</p>
                <ul>
                  <li>Service providers (hosting, analytics, payment processing), bound by confidentiality.</li>
                  <li>AI providers: in-game content may be sent to AI model providers solely to generate responses. We do not authorize these providers to use your data for training.</li>
                  <li>Legal authorities when required by law.</li>
                  <li>Acquirers in connection with a merger or sale of assets, with notice to you.</li>
                </ul>
              </div>
              <div className="privacy__section">
                <h3>5. Data Retention</h3>
                <p>We retain your data for as long as your account is active. You may delete your account at any time through Account &rarr; Deactivate Account. Upon deletion, your data is permanently removed within a reasonable period.</p>
              </div>
              <div className="privacy__section">
                <h3>6. Children's Privacy</h3>
                <p>The Service is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
              </div>
              <div className="privacy__section">
                <h3>7. Security</h3>
                <p>We use secure one-way password hashing with individual salts and implement reasonable technical measures to protect your data. No method of internet transmission is 100% secure.</p>
              </div>
              <div className="privacy__section">
                <h3>8. Your Rights and Choices</h3>
                <p>You may request access to, correction of, or deletion of your personal data. Account deletion is available in-app. For other requests, contact supportmaster@faetold.com.</p>
              </div>
              <div className="privacy__section">
                <h3>9. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. Continued use of the Service after changes take effect constitutes your acceptance of the revised policy.</p>
              </div>
              <div className="privacy__section">
                <h3>10. Contact</h3>
                <p>Email: <a href="mailto:supportmaster@faetold.com">supportmaster@faetold.com</a></p>
              </div>
            </>
          )}
          <button className="privacy__toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Read Full Privacy Policy'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setStatus('sending')
    // Compose mailto link as fallback (no backend needed)
    const subject = encodeURIComponent(`Faetold Contact: ${form.name.trim()}`)
    const body = encodeURIComponent(`From: ${form.name.trim()} <${form.email.trim()}>\n\n${form.message.trim()}`)
    window.location.href = `mailto:supportmaster@faetold.com?subject=${subject}&body=${body}`
    setStatus('sent')
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <section className="section contact" id="contact">
      <div className="section__inner">
        <h2 className="section__title">Contact Us</h2>
        <p className="section__subtitle">Have a question, suggestion, or just want to say hello? We'd love to hear from you.</p>
        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__row">
            <div className="contact__field">
              <label className="contact__label">Name</label>
              <input
                type="text"
                className="contact__input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="contact__field">
              <label className="contact__label">Email</label>
              <input
                type="email"
                className="contact__input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="contact__field">
            <label className="contact__label">Message</label>
            <textarea
              className="contact__input contact__textarea"
              placeholder="What's on your mind?"
              rows={5}
              value={form.message}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary contact__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Opening mail...' : status === 'sent' ? 'Mail client opened!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* <div className="footer__notify" id="download">
          <p className="footer__notify-text">Faetold is coming soon to iOS. Be the first to know.</p>
          <a href="mailto:support@faetold.com?subject=Notify me when Faetold launches" className="btn btn--primary">Get Notified</a>
        </div> */}
        <div className="footer__brand">
          <img src={`${B}/assets/images/logo/logo.png`} alt="Faetold" className="footer__logo" />
          <p className="footer__tagline">An AI-powered D&D adventure.</p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4>Product</h4>
            <a href="#features">Features</a>
          </div>
          <div className="footer__col">
            <h4>Resources</h4>
            <a href="mailto:supportmaster@faetold.com">Contact</a>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <a href="#" style={{ opacity: 0.5 }}>Discord (Coming Soon)</a>
            <a href="https://reddit.com/r/faetold" target="_blank" rel="noopener noreferrer">Reddit (r/faetold)</a>
            <a href="mailto:supportmaster@faetold.com">Email</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Faetold. All rights reserved.</p>
          <p className="footer__srd">Game mechanics based on the D&D 5e SRD. Not affiliated with Wizards of the Coast.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <PhoneShowcase />
      <EmailSignup />
      <Sustainability />
      <Contact />
      <Footer />
    </>
  )
}
