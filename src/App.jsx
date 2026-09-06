import { useEffect, useRef, useState } from 'react'

const MENU_URL = 'https://menu.caffecarducci.com/'
const MENU_DRAWER_EXIT_MS = 540
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Corso+Giosu%C3%A8+Carducci+18%2C+58100+Grosseto+GR'
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Corso+Giosu%C3%A8+Carducci+18%2C+58100+Grosseto+GR&output=embed'
const LOCATION = {
  street: 'Corso Giosuè Carducci, 18',
  locality: '58100 Grosseto GR',
}
const HOURS = [
  { days: 'Lun–Sab', time: '07:00–21:00' },
  { days: 'Dom', time: '08:00–20:00' },
]
const CONTACT = {
  phoneLabel: '+39 339 3673 693',
  phoneHref: 'tel:+393393673693',
  email: 'info@caffecarducci.com',
}
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/caffecarducci/' },
  { label: 'Facebook', href: 'https://www.facebook.com/124934174240588/' },
  { label: 'WhatsApp', href: 'https://wa.me/393393673693' },
]
const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS.filter(({ label }) => label !== 'WhatsApp')
const PHONE_LINK = CONTACT.phoneHref
const TRIPADVISOR_URL =
  'https://www.tripadvisor.it/Restaurant_Review-g194778-d3842533-Reviews-Caffe_Carducci-Grosseto_Province_of_Grosseto_Tuscany.html'

const REVIEWS = [
  { quote: 'Ragazzi gentili e preparati.', author: 'Adriana A' },
  { quote: 'Ottima qualità del caffè e delle pastine.', author: 'Ennio M.' },
  { quote: 'Servizio impeccabile.', author: 'Francesca R' },
]

const GALLERY_ITEMS = [
  {
    slug: '01-fuori',
    label: 'Fuori',
    alt: 'Esterno del Caffè Carducci durante una serata con gli ospiti',
    format: 'wide',
    offset: 'low',
  },
  {
    slug: 'caffe-espresso',
    label: 'Il rito del caffè',
    alt: 'Tazzina di espresso vista dall’alto accanto a un tovagliolo ricamato Caffè Carducci',
    format: 'square',
    offset: 'mid',
    fallback: 'png',
    width: 1254,
    height: 1254,
  },
  {
    slug: '02-barmen',
    label: 'Dietro il banco',
    alt: 'Barista prepara un cocktail dietro il banco del Caffè Carducci',
    format: 'portrait',
    offset: 'high',
  },
  {
    slug: '03-friends',
    label: 'Insieme',
    alt: 'Due amici sorridono insieme durante una serata al Caffè Carducci',
    format: 'medium',
    offset: 'mid',
  },
  {
    slug: '04-aperitivo',
    label: 'L’aperitivo',
    alt: 'Preparazione di un cocktail con ghiaccio e menta sul banco',
    format: 'square',
    offset: 'high',
  },
  {
    slug: '05-food',
    label: 'Sapori',
    alt: 'Piatto appena preparato presentato al banco del Caffè Carducci',
    format: 'wide',
    offset: 'low',
  },
  {
    slug: '06-ragazze',
    label: 'Serata',
    alt: 'Due amiche sorridono con un drink durante una serata al Caffè Carducci',
    format: 'portrait',
    offset: 'mid',
  },
  {
    slug: '07-rituale',
    label: 'Il rituale',
    alt: 'Due cocktail con cannella serviti su un tavolo verde',
    format: 'medium',
    offset: 'high',
  },
  {
    slug: '08-boys',
    label: 'Amici',
    alt: 'Amici riuniti a un tavolo durante una serata al Caffè Carducci',
    format: 'square',
    offset: 'low',
  },
  {
    slug: '09-carducci',
    label: 'Carducci',
    alt: 'Gruppo del Caffè Carducci brinda insieme dietro il banco',
    format: 'wide',
    offset: 'mid',
  },
]

const Arrow = ({ direction = 'right' }) => (
  <svg
    className={`arrow arrow--${direction}`}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 12h14M14 7l5 5-5 5" />
  </svg>
)

function Header({ onBook }) {
  const [activePopover, setActivePopover] = useState(null)
  const headerRef = useRef(null)
  const hoursTriggerRef = useRef(null)
  const contactsTriggerRef = useRef(null)
  const restoredActionRef = useRef(null)

  useEffect(() => {
    if (!activePopover) return undefined

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setActivePopover(null)
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      const trigger = activePopover === 'orari' ? hoursTriggerRef.current : contactsTriggerRef.current
      setActivePopover(null)
      window.requestAnimationFrame(() => trigger?.focus())
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePopover])

  useEffect(() => {
    if (!activePopover || !restoredActionRef.current) return undefined

    const action = restoredActionRef.current
    restoredActionRef.current = null
    const focusFrame = window.requestAnimationFrame(() => action.focus())
    return () => window.cancelAnimationFrame(focusFrame)
  }, [activePopover])

  const togglePopover = (name) => {
    setActivePopover((current) => (current === name ? null : name))
  }

  const openBookingFromPopover = (event) => {
    const opener = event.currentTarget
    const popover = activePopover
    setActivePopover(null)
    onBook(event, () => {
      restoredActionRef.current = opener
      setActivePopover(popover)
    })
  }

  return (
    <header className="site-header" ref={headerRef}>
      <a className="header-logo" href="#top" aria-label="Caffè Carducci, torna all'inizio">
        <img
          src="/assets/brand/caffe-carducci-logo.png"
          alt="Caffè Carducci"
          width="500"
          height="290"
        />
      </a>
      <nav className="header-links" aria-label="Navigazione principale">
        <div className="header-popover header-popover--hours">
          <button
            className="header-nav-trigger"
            id="hours-trigger"
            ref={hoursTriggerRef}
            type="button"
            aria-expanded={activePopover === 'orari'}
            aria-controls="hours-popover"
            aria-haspopup="dialog"
            onClick={() => togglePopover('orari')}
          >
            Orari
          </button>
          <div
            className="header-popover__panel header-popover__panel--hours"
            id="hours-popover"
            role="dialog"
            aria-labelledby="hours-trigger"
            hidden={activePopover !== 'orari'}
          >
            <div className="header-popover__accent" aria-hidden="true" />
            {HOURS.map(({ days, time }) => (
              <p className="header-popover__schedule" key={days}>
                {days}&nbsp;&nbsp;{time}
              </p>
            ))}
            <p className="header-popover__note">
              Gli orari possono variare.{' '}
              <button
                className="header-popover__inline-action"
                type="button"
                onClick={openBookingFromPopover}
              >
                Chiamaci
              </button>{' '}
              per confermare.
            </p>
          </div>
        </div>

        <div className="header-popover header-popover--contacts">
          <button
            className="header-nav-trigger"
            id="contacts-trigger"
            ref={contactsTriggerRef}
            type="button"
            aria-expanded={activePopover === 'contatti'}
            aria-controls="contacts-popover"
            aria-haspopup="dialog"
            onClick={() => togglePopover('contatti')}
          >
            Contatti
          </button>
          <div
            className="header-popover__panel header-popover__panel--contacts"
            id="contacts-popover"
            role="dialog"
            aria-labelledby="contacts-trigger"
            hidden={activePopover !== 'contatti'}
          >
            <div className="header-popover__accent" aria-hidden="true" />
            <address>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">
                {LOCATION.street},<br />{LOCATION.locality}
              </a>
            </address>
            <button
              className="header-popover__inline-action"
              type="button"
              onClick={openBookingFromPopover}
            >
              {CONTACT.phoneLabel}
            </button>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Hero({ onBook, onOpenMenu }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source srcSet="/assets/hero/carducci-cup-closeup.webp" type="image/webp" />
          <img
            src="/assets/hero/carducci-cup-closeup.png"
            alt=""
            width="1672"
            height="941"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero-shade" />

      <div className="hero-content page-shell">
        <div className="hero-identity">
          <h1 id="hero-title"><span>Caffè</span>{' '}<span>Carducci</span></h1>
          <p className="hero-subtitle">Caffè &amp; cucina</p>
          <p className="hero-since">Caffetteria dal 1998</p>
          <p className="hero-location">Grosseto, Toscana</p>
        </div>
        <div className="hero-actions">
          <button
            className="button brand-cta brand-cta--primary menu-drawer-trigger"
            type="button"
            onClick={onOpenMenu}
          >
            Scopri il menu <Arrow />
          </button>
          <button
            className="text-link brand-cta brand-cta--underline hero-book-trigger"
            type="button"
            onClick={onBook}
          >
            Prenota <Arrow />
          </button>
        </div>
      </div>

      <a className="hero-scroll" href="#storia" aria-label="Scorri alla nostra storia">
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

function Story() {
  return (
    <section className="story section" id="storia" aria-labelledby="story-title">
      <div className="page-shell story-grid">
        <div className="story-copy reveal story-reveal-copy">
          <div className="editorial-marker">
            <span aria-hidden="true">01</span>
            <span className="editorial-marker__line" aria-hidden="true" />
            <p>La nostra storia</p>
          </div>

          <h2 className="story-title" id="story-title">
            <span>Caffè Carducci è un luogo</span>
            <span>dove il caffè incontra</span>
            <span>la cucina e il ritmo</span>
            <span>della città.</span>
          </h2>

          <div className="story-body">
            <p>
              Nel cuore di Grosseto, Carducci è un luogo dove il caffè, la cucina e le
              persone si incontrano ogni giorno.
            </p>
            <p>
              Dalla colazione all’aperitivo, ogni momento ha il suo ritmo. Un ambiente
              informale, autentico e accogliente, pensato per essere vissuto.
            </p>
          </div>

          <blockquote className="story-quote reveal story-quote-reveal">
            “Un luogo da vivere.”
          </blockquote>
        </div>

        <figure className="story-photo reveal story-photo-reveal">
          <picture>
            <source srcSet="/assets/story/carducci-interior.webp" type="image/webp" />
            <img
              src="/assets/story/carducci-interior.jpg"
              alt="Interno del Caffè Carducci con archi, tavoli e bancone in legno"
              loading="lazy"
              width="943"
              height="943"
            />
          </picture>
        </figure>

      </div>
    </section>
  )
}

function Piatti({ onOpenMenu }) {
  return (
    <section className="piatti section" id="piatti" aria-labelledby="piatti-title">
      <div className="page-shell piatti-shell">
        <div className="piatti-intro reveal piatti-intro-reveal">
          <div className="editorial-marker">
            <span aria-hidden="true">02</span>
            <span className="editorial-marker__line" aria-hidden="true" />
            <p>I nostri piatti</p>
          </div>

          <h2 id="piatti-title">
            <span>Sapori, colori, momenti.</span>
            <span>La cucina di Caffè Carducci.</span>
          </h2>
        </div>

        <div className="piatti-grid">
          <figure className="piatti-card piatti-card--morning reveal piatti-card-reveal">
            <div className="piatti-card__media">
              <picture>
                <source srcSet="/assets/piatti/insalatone.webp" type="image/webp" />
                <img
                  src="/assets/piatti/insalatone.png"
                  alt="Insalatona con verdure, olive, uova e tonno"
                  loading="lazy"
                  width="1535"
                  height="1024"
                />
              </picture>
            </div>
            <figcaption>
              <span>Mattina</span>
              <p>Colazione &amp; caffè</p>
            </figcaption>
          </figure>

          <figure className="piatti-card piatti-card--evening reveal piatti-card-reveal">
            <div className="piatti-card__media">
              <picture>
                <source
                  srcSet="/assets/piatti/cocktail-sera.webp"
                  type="image/webp"
                />
                <img
                  src="/assets/piatti/cocktail-sera.jpeg"
                  alt="Cocktail con lime e menta servito sul bancone"
                  loading="lazy"
                  width="524"
                  height="533"
                />
              </picture>
            </div>
            <figcaption>
              <span>Sera</span>
              <p>Aperitivo &amp; cucina</p>
            </figcaption>
          </figure>
        </div>

        <button
          className="button brand-cta brand-cta--primary piatti-cta menu-drawer-trigger"
          type="button"
          onClick={onOpenMenu}
        >
          Scopri il menu <Arrow />
        </button>
      </div>
    </section>
  )
}

function Vivi() {
  return (
    <section className="vivi section" id="vivi" aria-labelledby="vivi-title">
      <div className="page-shell vivi-shell">
        <div className="editorial-marker reveal vivi-marker-reveal">
          <span aria-hidden="true">03</span>
          <span className="editorial-marker__line" aria-hidden="true" />
          <h2 id="vivi-title">Vivi Caffè Carducci</h2>
        </div>

        <div className="vivi-collage">
          <figure className="vivi-figure vivi-figure--interior reveal vivi-figure-reveal">
            <div className="vivi-figure__media">
              <picture>
                <source srcSet="/assets/vivi/interior.webp" type="image/webp" />
                <img
                  src="/assets/vivi/interior.jpeg"
                  alt="Interno del Caffè Carducci durante una serata con gli ospiti"
                  loading="lazy"
                  width="2048"
                  height="1367"
                />
              </picture>
            </div>
            <figcaption>
              <span>Interior</span>
              <p>Dentro Carducci</p>
            </figcaption>
          </figure>

          <figure className="vivi-figure vivi-figure--people reveal vivi-figure-reveal">
            <div className="vivi-figure__media">
              <picture>
                <source srcSet="/assets/vivi/people.webp" type="image/webp" />
                <img
                  src="/assets/vivi/people.jpeg"
                  alt="Due amici sorridono insieme con i loro drink da Carducci"
                  loading="lazy"
                  width="2048"
                  height="1367"
                />
              </picture>
            </div>
            <figcaption>
              <span>People</span>
              <p>Insieme</p>
            </figcaption>
          </figure>

          <figure className="vivi-figure vivi-figure--drink reveal vivi-figure-reveal">
            <div className="vivi-figure__media">
              <picture>
                <source srcSet="/assets/vivi/drink.webp" type="image/webp" />
                <img
                  src="/assets/vivi/drink.jpeg"
                  alt="Cocktail con agrumi e bottiglie disposti sul tavolo"
                  loading="lazy"
                  width="1080"
                  height="1080"
                />
              </picture>
            </div>
            <figcaption>
              <span>Bar</span>
              <p>L’aperitivo</p>
            </figcaption>
          </figure>

          <div className="vivi-closing reveal vivi-line-reveal">
            <p className="vivi-line">
              <span>Dal primo caffè del mattino</span>
              <span>all’ultimo aperitivo della sera.</span>
            </p>
            <a
              className="text-link brand-cta brand-cta--underline vivi-cta"
              href="#recensioni"
            >
              Un luogo da vivere <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const [activeReview, setActiveReview] = useState(0)
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [reducedMotion, setReducedMotion] = useState(false)
  const transitionLockedRef = useRef(false)
  const timersRef = useRef([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference)
  }, [])

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const changeReview = (direction) => {
    if (transitionLockedRef.current) return

    const nextReview = (activeReview + direction + REVIEWS.length) % REVIEWS.length
    if (reducedMotion) {
      setActiveReview(nextReview)
      return
    }

    transitionLockedRef.current = true
    setTransitionPhase('exit')

    const swapTimer = window.setTimeout(() => {
      setActiveReview(nextReview)
      setTransitionPhase('enter')

      const enterTimer = window.setTimeout(() => {
        setTransitionPhase('enter-active')

        const finishTimer = window.setTimeout(() => {
          setTransitionPhase('idle')
          transitionLockedRef.current = false
        }, 300)
        timersRef.current.push(finishTimer)
      }, 20)
      timersRef.current.push(enterTimer)
    }, 300)
    timersRef.current.push(swapTimer)
  }

  const review = REVIEWS[activeReview]
  const transitioning = transitionPhase !== 'idle'

  return (
    <section className="reviews section" id="recensioni" aria-labelledby="reviews-title">
      <span className="reviews-decorative-quote" aria-hidden="true">“</span>
      <div className="page-shell reviews-shell">
        <div className="editorial-marker reviews-marker reveal">
          <span aria-hidden="true">04</span>
          <span className="editorial-marker__line" aria-hidden="true" />
          <p>DICONO DI NOI</p>
        </div>

        <h2 className="reviews-title reveal" id="reviews-title">
          PAROLE, PERSONE, CAFFÈ CARDUCCI.
        </h2>

        <div className="reviews-stage reveal">
          <div
            className={`review-content review-content--${transitionPhase}`}
            aria-live="polite"
            aria-atomic="true"
            aria-busy={transitioning}
          >
            <div className="review-stars" aria-hidden="true">★★★★★</div>
            <blockquote>
              <p>“{review.quote}”</p>
              <footer>
                — <cite>{review.author}</cite> <span>· Tripadvisor</span>
              </footer>
            </blockquote>
          </div>

          <div className="reviews-navigation">
            <span className="reviews-counter" aria-label={`Recensione ${activeReview + 1} di ${REVIEWS.length}`}>
              {String(activeReview + 1).padStart(2, '0')}/{String(REVIEWS.length).padStart(2, '0')}
            </span>
            <div className="reviews-controls">
              <button
                type="button"
                aria-label="Recensione precedente"
                aria-disabled={transitioning}
                onClick={() => changeReview(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Recensione successiva"
                aria-disabled={transitioning}
                onClick={() => changeReview(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <a
          className="reviews-cta"
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noreferrer"
        >
          Leggi tutte le recensioni <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

function Gallery() {
  const trackRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const dragRef = useRef({ active: false, dragged: false, pointerId: null, startX: 0, scrollLeft: 0 })
  const swipeRef = useRef({ active: false, pointerId: null, startX: 0, startY: 0 })
  const suppressClickRef = useRef(false)
  const openerRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const lightboxOpen = lightboxIndex !== null

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const handleWheel = (event) => {
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY) || Math.abs(event.deltaY) < 1) return
      const maxScroll = track.scrollWidth - track.clientWidth
      const canMove = event.deltaY > 0 ? track.scrollLeft < maxScroll - 1 : track.scrollLeft > 1
      if (!canMove) return

      event.preventDefault()
      track.scrollLeft += event.deltaY
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (lightboxOpen) {
      if (!dialog.open) dialog.showModal()
      document.body.classList.add('gallery-lightbox-open')
      window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    }

    return () => document.body.classList.remove('gallery-lightbox-open')
  }, [lightboxOpen])

  useEffect(() => {
    if (lightboxIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setLightboxIndex((current) => (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setLightboxIndex((current) => (current + 1) % GALLERY_ITEMS.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const openLightbox = (index, trigger) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    openerRef.current = trigger
    setLightboxIndex(index)
  }

  const requestCloseLightbox = () => dialogRef.current?.close()

  const handleLightboxClosed = () => {
    setLightboxIndex(null)
    document.body.classList.remove('gallery-lightbox-open')
    window.requestAnimationFrame(() => openerRef.current?.focus())
  }

  const changeLightboxItem = (direction) => {
    setLightboxIndex((current) => (current + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
  }

  const scrollTrack = (direction) => {
    const track = trackRef.current
    if (!track) return
    const candidates = [...track.querySelectorAll('[data-gallery-snap]')]
    const current = track.scrollLeft
    let target

    if (direction > 0) {
      target = candidates.find((item) => item.offsetLeft > current + 24) ?? candidates.at(-1)
    } else {
      target = [...candidates].reverse().find((item) => item.offsetLeft < current - 24) ?? candidates[0]
    }

    track.scrollTo({ left: target.offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const handleTrackPointerDown = (event) => {
    if (event.pointerType === 'touch' || event.button !== 0) return
    // Let inline links keep their native click/focus behavior instead of
    // being captured by the horizontal drag gesture on the parent track.
    if (event.target.closest?.('a')) return
    const track = trackRef.current
    dragRef.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    }
    track.setPointerCapture(event.pointerId)
    track.classList.add('is-dragging')
  }

  const handleTrackPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    const delta = event.clientX - drag.startX
    if (Math.abs(delta) > 7) drag.dragged = true
    trackRef.current.scrollLeft = drag.scrollLeft - delta
  }

  const finishTrackDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    const track = trackRef.current
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    track.classList.remove('is-dragging')
    if (drag.dragged) {
      suppressClickRef.current = true
      window.setTimeout(() => { suppressClickRef.current = false }, 80)
    }
    dragRef.current = { ...drag, active: false }
  }

  const handleSwipeStart = (event) => {
    swipeRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    }
  }

  const handleSwipeEnd = (event) => {
    const swipe = swipeRef.current
    if (!swipe.active || swipe.pointerId !== event.pointerId) return
    const deltaX = event.clientX - swipe.startX
    const deltaY = event.clientY - swipe.startY
    swipeRef.current.active = false
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return
    changeLightboxItem(deltaX < 0 ? 1 : -1)
  }

  const lightboxItem = lightboxIndex === null ? null : GALLERY_ITEMS[lightboxIndex]

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <div className="page-shell gallery-header reveal">
        <div className="editorial-marker">
          <span aria-hidden="true">05</span>
          <span className="editorial-marker__line" aria-hidden="true" />
          <p>Gallery</p>
        </div>
        <h2 id="gallery-title">
          <span>Momenti</span>
          <span>da Caffè Carducci.</span>
        </h2>
        <div className="gallery-track-controls" aria-label="Controlli galleria">
          <button type="button" aria-label="Scorri la galleria indietro" onClick={() => scrollTrack(-1)}>←</button>
          <button type="button" aria-label="Scorri la galleria avanti" onClick={() => scrollTrack(1)}>→</button>
        </div>
      </div>

      <div className="gallery-track-shell reveal">
        <div
          className="gallery-track"
          ref={trackRef}
          aria-label="Fotografie di Carducci"
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={finishTrackDrag}
          onPointerCancel={finishTrackDrag}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <figure
              className={`gallery-item gallery-item--${item.format} gallery-item--${item.offset}`}
              data-gallery-snap
              key={item.slug}
            >
              <button
                type="button"
                aria-label={`Apri immagine ${String(index + 1).padStart(2, '0')}: ${item.label}`}
                onClick={(event) => openLightbox(index, event.currentTarget)}
              >
                <picture>
                  <source srcSet={`/assets/gallery/${item.slug}.webp`} type="image/webp" />
                  <img
                    src={`/assets/gallery/${item.slug}.${item.fallback ?? 'jpeg'}`}
                    alt={item.alt}
                    loading="lazy"
                    width={item.width ?? 2048}
                    height={item.height ?? 1367}
                  />
                </picture>
                <span className="gallery-item__caption">
                  {String(index + 1).padStart(2, '0')} <span aria-hidden="true">—</span> {item.label}
                </span>
              </button>
            </figure>
          ))}

          <aside className="gallery-instagram-card" data-gallery-snap aria-label="Segui Carducci su Instagram">
            <span>Vivi Caffè Carducci</span>
            <p>Seguici su Instagram</p>
            <a
              href="https://www.instagram.com/caffecarducci/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram — Caffè Carducci"
              onPointerDown={(event) => event.stopPropagation()}
            >
              @caffecarducci <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>

      </div>

      <dialog
        className="gallery-lightbox"
        ref={dialogRef}
        aria-label="Galleria fotografica"
        onClose={handleLightboxClosed}
        onCancel={(event) => {
          event.preventDefault()
          requestCloseLightbox()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) requestCloseLightbox()
        }}
      >
        {lightboxItem && (
          <div
            className="gallery-lightbox__content"
            onClick={(event) => {
              if (event.target === event.currentTarget) requestCloseLightbox()
            }}
          >
            <button
              className="gallery-lightbox__close"
              ref={closeButtonRef}
              type="button"
              aria-label="Chiudi la galleria"
              onClick={requestCloseLightbox}
            >
              <span aria-hidden="true">×</span>
            </button>

            <div
              className="gallery-lightbox__media"
              onClick={(event) => {
                if (event.target === event.currentTarget) requestCloseLightbox()
              }}
              onPointerDown={handleSwipeStart}
              onPointerUp={handleSwipeEnd}
              onPointerCancel={() => { swipeRef.current.active = false }}
            >
              <picture>
                <source srcSet={`/assets/gallery/${lightboxItem.slug}.webp`} type="image/webp" />
                <img
                  src={`/assets/gallery/${lightboxItem.slug}.${lightboxItem.fallback ?? 'jpeg'}`}
                  alt={lightboxItem.alt}
                  width={lightboxItem.width ?? 2048}
                  height={lightboxItem.height ?? 1367}
                />
              </picture>
            </div>

            <p className="gallery-lightbox__announcement" aria-live="polite" aria-atomic="true">
              Immagine {lightboxIndex + 1} di {GALLERY_ITEMS.length}: {lightboxItem.label}
            </p>
            <div className="gallery-lightbox__counter" aria-hidden="true">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
            </div>
            <div className="gallery-lightbox__controls">
              <button type="button" aria-label="Immagine precedente" onClick={() => changeLightboxItem(-1)}>←</button>
              <button type="button" aria-label="Immagine successiva" onClick={() => changeLightboxItem(1)}>→</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function Visit() {
  const [interactiveMapVisible, setInteractiveMapVisible] = useState(false)
  const mapModeButtonRef = useRef(null)

  const setMapMode = (visible) => {
    setInteractiveMapVisible(visible)
    window.requestAnimationFrame(() => mapModeButtonRef.current?.focus())
  }

  return (
    <section className="visit section" id="dove" aria-labelledby="visit-title">
      <div className="page-shell visit-shell">
        <header className="visit-intro">
          <div className="reveal visit-marker-reveal">
            <div className="editorial-marker">
              <span aria-hidden="true">06</span>
              <span className="editorial-marker__line" aria-hidden="true" />
              <p>Nel cuore di Grosseto</p>
            </div>
          </div>
          <p className="visit-question reveal visit-question-reveal">Passi da Grosseto?</p>
          <h2 className="visit-title reveal visit-title-reveal" id="visit-title">
            Fermati da Caffè Carducci.
          </h2>
        </header>

        <div className="visit-place" aria-label="Corso Carducci e posizione del Caffè Carducci">
          <figure className="visit-photo">
            <div className="visit-photo__reveal reveal">
              <picture>
                <source
                  srcSet="/assets/location/caffe-carducci-facade.webp"
                  type="image/webp"
                />
                <img
                  src="/assets/location/caffe-carducci-facade.jpg"
                  alt="Facciata del Caffè Carducci con l'insegna illuminata"
                  loading="lazy"
                  width="866"
                  height="866"
                />
              </picture>
            </div>
          </figure>

          <p className="visit-place__label reveal" aria-hidden="true">Grosseto</p>

          <div className="visit-map-position">
            <div className="visit-map reveal visit-map-reveal">
              <div className="visit-map__frame">
                {interactiveMapVisible ? (
                  <>
                    <iframe
                      src={MAP_EMBED_URL}
                      title="Mappa interattiva del Caffè Carducci a Grosseto"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <button
                      className="visit-map__mode-toggle visit-map__mode-toggle--active"
                      type="button"
                      ref={mapModeButtonRef}
                      onClick={() => setMapMode(false)}
                      aria-label="Torna all’anteprima e rimuovi la mappa interattiva Google"
                    >
                      Torna all’anteprima
                    </button>
                  </>
                ) : (
                  <div className="visit-map__preview">
                    <svg
                      className="visit-map__schematic"
                      viewBox="0 0 600 438"
                      preserveAspectRatio="xMidYMid slice"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <rect className="visit-map__schematic-ground" width="600" height="438" />
                      <path className="visit-map__schematic-block" d="M-20 72 129 14l92 54-26 94-162 26Z" />
                      <path className="visit-map__schematic-block" d="m278-20 146 19 28 112-123 54-71-66Z" />
                      <path className="visit-map__schematic-block" d="m488 72 132 43-8 132-116 24-58-91Z" />
                      <path className="visit-map__schematic-block" d="m-28 260 145-60 107 81-18 177H-14Z" />
                      <path className="visit-map__schematic-block" d="m276 243 139-74 79 87-24 170-174 32-67-109Z" />
                      <path className="visit-map__schematic-street visit-map__schematic-street--main" d="M235-35c-18 80 25 145 10 227-14 79-6 172 27 277" />
                      <path className="visit-map__schematic-street" d="M-30 222c112-1 181-41 275-30 111 14 207 84 392 36" />
                      <path className="visit-map__schematic-street" d="M68-20c54 88 96 122 177 146 96 29 193 19 374-32" />
                      <path className="visit-map__schematic-street" d="M92 468c29-88 83-127 165-151 115-33 227-22 376 27" />
                      <circle className="visit-map__schematic-ring" cx="252" cy="219" r="77" />
                      <circle className="visit-map__schematic-marker" cx="252" cy="219" r="8" />
                      <text className="visit-map__schematic-label visit-map__schematic-label--centre" x="300" y="105">CENTRO STORICO</text>
                      <text className="visit-map__schematic-label visit-map__schematic-label--street" x="265" y="184">CORSO CARDUCCI</text>
                      <text className="visit-map__schematic-label visit-map__schematic-label--city" x="445" y="338">GROSSETO</text>
                    </svg>
                    <div className="visit-map__marker">
                      <span aria-hidden="true" />
                      <p><strong>Caffè Carducci</strong>{LOCATION.street.replace('Giosuè ', '')}</p>
                    </div>
                    <p className="visit-map__preview-note">Mappa illustrativa</p>
                    <button
                      className="visit-map__mode-toggle"
                      type="button"
                      ref={mapModeButtonRef}
                      onClick={() => setMapMode(true)}
                      aria-label="Mostra la mappa interattiva Google. Il caricamento contatterà Google."
                      title="Carica la mappa interattiva da Google"
                    >
                      Mostra mappa
                    </button>
                  </div>
                )}
              </div>
              <a
                className="visit-map__cta"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Apri in Google Maps <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="visit-details reveal visit-details-reveal">
          <section className="visit-detail">
            <h3>Visitaci</h3>
            <address>
              {LOCATION.street}<br />
              {LOCATION.locality}
            </address>
          </section>

          <section className="visit-detail">
            <h3>Orari</h3>
            <dl className="visit-hours">
              {HOURS.map(({ days, time }) => (
                <div key={days}>
                  <dt>{days}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="visit-detail">
            <h3>Contatti</h3>
            <div className="visit-link-list">
              <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </section>

          <section className="visit-detail">
            <h3>Seguici</h3>
            <div className="visit-link-list visit-link-list--arrow">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a href={href} target="_blank" rel="noreferrer" key={label}>
                  {label} <Arrow />
                </a>
              ))}
            </div>
          </section>

          <section className="visit-detail visit-detail--directions">
            <h3>Indicazioni</h3>
            <div className="visit-link-list visit-link-list--arrow">
              <a href={MAPS_URL} target="_blank" rel="noreferrer">
                Google Maps <Arrow />
              </a>
            </div>
          </section>
        </div>

        <div className="visit-coordinates reveal visit-coordinates-reveal">
          <p className="visit-coordinates__numbers" aria-hidden="true">
            <span>42.7604° N</span>
            <span>11.1137° E</span>
          </p>
          <p className="visit-coordinates__place">Grosseto · Toscana · Italia</p>
        </div>
      </div>
    </section>
  )
}

function Footer({ onBook }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-shell">
        <a className="footer-brand" href="#top" aria-label="Caffè Carducci, torna all'inizio">
          <img
            src="/assets/brand/caffe-carducci-logo.png"
            alt=""
            width="500"
            height="290"
          />
          <span>CAFFÈ CARDUCCI</span>
        </a>

        <div className="footer-editorial reveal">
          <div className="footer-invitation">
            <p>Un caffè, un pranzo, un aperitivo.<br />Ti aspettiamo.</p>
            <div className="footer-actions">
              <button className="footer-book" type="button" onClick={onBook}>
                Prenota <Arrow />
              </button>
              <nav className="footer-socials" aria-label="Social Caffè Carducci">
                {FOOTER_SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label} — Caffè Carducci`}
                    key={label}
                  >
                    {label === 'Instagram' ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4.25" />
                        <circle className="footer-socials__dot" cx="17.4" cy="6.7" r="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.75 21v-8h2.85l.43-3.3h-3.28V7.6c0-.96.27-1.61 1.64-1.61h1.75V3.04c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.36V9.7H7.5V13h2.84v8h3.41Z" />
                      </svg>
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <p className="footer-statement">
            Il piacere di stare insieme,<br />nel cuore di Grosseto.
          </p>
        </div>

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Caffè Carducci</p>
          <nav aria-label="Navigazione a piè di pagina">
            <a href="#storia">Storia</a>
            <a href="#piatti">Menu</a>
            <a href="#dove">Dove siamo</a>
            <a
              id="privacy-policy"
              href="#privacy-policy"
              title="Privacy Policy — in preparazione"
              aria-label="Privacy Policy — in preparazione"
              onClick={(event) => event.preventDefault()}
            >
              Privacy Policy
            </a>
          </nav>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>

        <p className="footer-credit">
          Sito realizzato da Julia · Per contatti:{' '}
          <a href="mailto:Julia.webdesign@gmail.com">Julia.webdesign@gmail.com</a>
        </p>
      </div>
    </footer>
  )
}

function MenuDrawer({ open, onRequestClose, onExited }) {
  const [rendered, setRendered] = useState(open)
  const [phase, setPhase] = useState(open ? 'open' : 'closed')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const renderedRef = useRef(open)
  const enterFrameRef = useRef(null)
  const settleFrameRef = useRef(null)
  const exitTimerRef = useRef(null)
  const onRequestCloseRef = useRef(onRequestClose)
  const onExitedRef = useRef(onExited)

  useEffect(() => {
    onRequestCloseRef.current = onRequestClose
  }, [onRequestClose])

  useEffect(() => {
    onExitedRef.current = onExited
  }, [onExited])

  useEffect(() => {
    window.cancelAnimationFrame(enterFrameRef.current)
    window.cancelAnimationFrame(settleFrameRef.current)
    window.clearTimeout(exitTimerRef.current)

    if (open) {
      if (!renderedRef.current) {
        renderedRef.current = true
        setRendered(true)
        setIframeLoaded(false)
      }

      setPhase('opening')
      enterFrameRef.current = window.requestAnimationFrame(() => {
        settleFrameRef.current = window.requestAnimationFrame(() => setPhase('open'))
      })
    } else if (renderedRef.current) {
      setPhase('closing')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      exitTimerRef.current = window.setTimeout(
        () => {
          renderedRef.current = false
          setRendered(false)
          setPhase('closed')
          onExitedRef.current?.()
        },
        reducedMotion ? 20 : MENU_DRAWER_EXIT_MS,
      )
    }

    return () => {
      window.cancelAnimationFrame(enterFrameRef.current)
      window.cancelAnimationFrame(settleFrameRef.current)
      window.clearTimeout(exitTimerRef.current)
    }
  }, [open])

  useEffect(() => {
    if (!open || !rendered) return undefined

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [open, rendered])

  useEffect(() => {
    if (!rendered) return undefined

    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      const computedPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${computedPadding + scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [rendered])

  useEffect(() => {
    if (!rendered) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (open) onRequestCloseRef.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute('hidden'))

      if (focusable.length === 0) {
        event.preventDefault()
        closeButtonRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const focusIsOutside = !panelRef.current?.contains(document.activeElement)

      if (event.shiftKey && (document.activeElement === first || focusIsOutside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || focusIsOutside)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, rendered])

  if (!rendered) return null

  return (
    <div
      className={`menu-drawer-layer menu-drawer-layer--${phase}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onRequestCloseRef.current?.()
      }}
    >
      <section
        className="menu-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-drawer-title"
      >
        <header className="menu-drawer__header">
          <div className="menu-drawer__identity">
            <h2 id="menu-drawer-title">Il menu</h2>
            <p>Caffè Carducci · Grosseto</p>
          </div>
          <button
            className="menu-drawer__close"
            ref={closeButtonRef}
            type="button"
            onClick={() => onRequestCloseRef.current?.()}
          >
            <span>Chiudi</span>
            <span className="menu-drawer__close-glyph" aria-hidden="true">×</span>
          </button>
        </header>

        <div className="menu-drawer__body">
          <div
            className={`menu-drawer__loading${iframeLoaded ? ' is-hidden' : ''}`}
            role="status"
            aria-live="polite"
            aria-hidden={iframeLoaded}
          >
            <p>Caffè Carducci</p>
            <span>Il menu sta arrivando…</span>
            <i aria-hidden="true" />
          </div>
          <iframe
            className="menu-drawer__frame"
            src={MENU_URL}
            title="Menu Caffè Carducci"
            tabIndex={0}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        <footer className="menu-drawer__footer">
          <p>Caffè Carducci · Grosseto</p>
          <a href={MENU_URL} target="_blank" rel="noreferrer">
            Apri il menu completo <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </div>
  )
}

function BookingDialog({ open, onClose }) {
  const dialogRef = useRef(null)
  const callButtonRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (open) {
      if (!dialog.open) dialog.showModal()
      document.body.classList.add('dialog-open')
      window.requestAnimationFrame(() => callButtonRef.current?.focus())
    } else if (dialog.open) {
      dialog.close()
    }

    return () => document.body.classList.remove('dialog-open')
  }, [open])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <dialog
      className="booking-dialog"
      ref={dialogRef}
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog()
      }}
    >
      <div className="booking-dialog__inner">
        <button
          className="booking-dialog__close"
          type="button"
          aria-label="Chiudi"
          onClick={closeDialog}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <p className="eyebrow">Prenota da Caffè Carducci</p>
        <h2 id="booking-title">Ci sentiamo?</h2>
        <p id="booking-description">
          Per riservare un tavolo, chiamaci direttamente. Saremo felici di aiutarti.
        </p>
        <a ref={callButtonRef} className="booking-phone" href={PHONE_LINK}>
          +39 339 3673 693
        </a>
        <a className="button button--red" href={PHONE_LINK}>
          Chiamare <Arrow />
        </a>
      </div>
    </dialog>
  )
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)
  const bookingTriggerRef = useRef(null)
  const bookingFocusRestoreRef = useRef(null)
  const menuTriggerRef = useRef(null)

  const openBooking = (event, restoreFocus = null) => {
    bookingTriggerRef.current = event.currentTarget
    bookingFocusRestoreRef.current = restoreFocus
    setBookingOpen(true)
  }

  const closeBooking = () => {
    setBookingOpen(false)
    window.requestAnimationFrame(() => {
      if (bookingFocusRestoreRef.current) {
        bookingFocusRestoreRef.current()
        bookingFocusRestoreRef.current = null
      } else {
        bookingTriggerRef.current?.focus()
      }
    })
  }

  const openMenuDrawer = (event) => {
    menuTriggerRef.current = event.currentTarget
    setMenuDrawerOpen(true)
  }

  const closeMenuDrawer = () => setMenuDrawerOpen(false)

  const restoreMenuTriggerFocus = () => {
    window.requestAnimationFrame(() => {
      if (menuTriggerRef.current?.isConnected) menuTriggerRef.current.focus()
    })
  }

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Vai al contenuto</a>
      <Header onBook={openBooking} />
      <main id="main-content">
        <Hero onBook={openBooking} onOpenMenu={openMenuDrawer} />
        <Story />
        <Piatti onOpenMenu={openMenuDrawer} />
        <Vivi />
        <Reviews />
        <Gallery />
        <Visit />
      </main>
      <Footer onBook={openBooking} />
      <MenuDrawer
        open={menuDrawerOpen}
        onRequestClose={closeMenuDrawer}
        onExited={restoreMenuTriggerFocus}
      />
      <BookingDialog open={bookingOpen} onClose={closeBooking} />
    </>
  )
}

export default App
