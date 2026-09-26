import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { useMagnetic } from '../hooks/useMagnetic'
import heroVideoDesktop from '../assets/video/hero-candidato-desktop.mp4'
import heroVideoMobile from '../assets/video/hero-candidato-mobile.mp4'
import heroPoster from '../assets/video/hero-candidato-poster.webp'
import { SITE, SOCIAL_LINKS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3)
  // Read synchronously (not via effect+state) so the reduced-motion layout is correct on
  // the very first render — this is a client-only SPA, so `window` is always available here.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const videoSrc = window.matchMedia('(max-width: 767px)').matches ? heroVideoMobile : heroVideoDesktop

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) return

    // Mobile browsers (iOS Safari especially) never decode a single frame until playback
    // has started at least once — seeking `currentTime` on a video that has never played
    // renders solid black. Priming with a muted play()/pause() makes subsequent seeks
    // actually paint frames. Harmless on desktop too (imperceptible, muted, instant).
    // If that first play() is refused (iOS Low Power Mode blocks even muted autoplay),
    // retry on the first touch: touchstart counts as a user gesture, and it always
    // happens right before the user starts scrolling the hero on a phone.
    let primed = false
    const prime = () => {
      if (primed) return
      video.play().then(
        () => {
          primed = true
          video.pause()
          window.removeEventListener('touchstart', prime)
        },
        () => {},
      )
    }
    video.muted = true
    video.load()
    prime()
    window.addEventListener('touchstart', prime, { passive: true })

    // Scroll-scrubbed video: absolute scroll progress maps directly to video.currentTime,
    // fully reversible. A persistent rAF loop lerps toward that target instead of setting
    // currentTime straight from the scroll event, which is what keeps the seek smooth
    // instead of stuttering when the user scrolls fast or with a high-frequency trackpad.
    // This loop is cleaned up in the outer effect return, not inside gsap.context()'s
    // callback — that callback's return value is not a cleanup hook, GSAP ignores it.
    let targetProgress = 0
    let smoothedTime = 0
    let rafId = 0

    function tick() {
      if (video && video.duration) {
        const targetTime = targetProgress * video.duration
        smoothedTime += (targetTime - smoothedTime) * 0.25
        // WebKit drops intermediate frames if a new seek is issued while one is still in
        // flight, so only seek once the previous one has landed.
        if (!video.seeking && Math.abs(smoothedTime - video.currentTime) > 0.008) {
          video.currentTime = smoothedTime
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const ctx = gsap.context(() => {
      // Entrance: the hero content settles in on load, independent of scroll.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-hero-in]', { opacity: 0, y: 22 })
      tl.to('[data-hero-in]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 })
      tl.fromTo(video, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.1)

      // Text-phase timeline: three short beats (intro / turn / fist) mapped loosely onto
      // the 0-15% / 15-70% / 70-100% scroll narrative described by the source video itself.
      const phases = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      })
      phases
        .to('[data-phase-1]', { opacity: 0, y: -18, duration: 0.15 }, 0.14)
        .to('[data-hero-name]', { scale: 0.85, duration: 0.15 }, 0.14)
        .fromTo('[data-phase-2]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.18 }, 0.24)
        .to('[data-phase-2]', { opacity: 0, y: -14, duration: 0.15 }, 0.6)
        .fromTo('[data-phase-3]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.2 }, 0.74)

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          targetProgress = self.progress
        },
      })

      rafId = requestAnimationFrame(tick)
    }, wrapRef)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('touchstart', prime)
      ctx.revert()
    }
  }, [reduceMotion, videoSrc])

  return (
    <div ref={wrapRef} id="top" className={`relative bg-ink ${reduceMotion ? '' : 'h-[150vh] md:h-[190vh]'}`}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(141,198,63,0.08),_transparent_60%)]" />

        {/* Mobile: a column where the video only takes the height the text leaves free, so the
            whole figure always fits the *visible* viewport (browser bars included) instead of
            overflowing and getting its head clipped. Desktop: two-column split. */}
        <Container className="relative flex h-full flex-col items-center gap-3 pb-6 pt-[4.5rem] md:grid md:grid-cols-[1fr_1fr] md:gap-4 md:py-0">
          <div className="relative z-10 flex w-full flex-col items-center text-center md:items-start md:text-left">
            <div data-hero-in className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/75 md:mb-4 md:tracking-[0.18em]">
              {SITE.party} · {SITE.district}
            </div>

            <h1
              data-hero-name
              className="font-display origin-center text-[2.25rem] font-semibold leading-[0.98] tracking-tight text-paper sm:text-5xl md:origin-left lg:text-7xl"
            >
              <span data-hero-in className="inline-block md:block">
                Martín
              </span>{' '}
              <span data-hero-in className="inline-flex items-center gap-2 md:flex md:gap-3">
                Álvarez
                <span aria-hidden className="inline-block size-2 rounded-full bg-ember sm:size-3.5" />
              </span>
            </h1>

            <p data-hero-in className="mt-2 text-[15px] font-medium text-paper/80 sm:text-xl md:mt-3">
              {SITE.role} · {SITE.district}
            </p>

            <div className="relative mt-3 h-[4.75rem] w-full max-w-md sm:h-16 md:mt-5 md:h-20">
              {/* Entrance and scroll phase are split across two elements on purpose: when one
                  element's opacity is owned by both the load timeline and the scrub timeline,
                  the load tween wins and the sentence never fades out on scroll. */}
              <div data-hero-in className="absolute inset-x-0 top-0">
                <div data-phase-1 className="text-[15px] leading-snug text-paper/75 md:text-lg md:leading-relaxed">
                  {SITE.heroStatement}
                </div>
              </div>
              <p
                data-phase-2
                className="absolute inset-x-0 top-0 mx-auto max-w-xs -rotate-1 font-script text-[1.45rem] leading-tight text-paper/90 opacity-0 md:mx-0 md:text-3xl"
              >
                Diez años de trabajo territorial en el sur de la ciudad.
              </p>
              <div data-phase-3 className="absolute inset-x-0 top-0 opacity-0">
                <p className="mx-auto max-w-xs -rotate-1 font-script text-[1.45rem] leading-tight text-ember-soft md:mx-0 md:text-3xl">
                  Ahora quiero escucharte a vos.
                </p>
              </div>
            </div>

            <div data-hero-in className="mt-4 flex flex-wrap items-center justify-center gap-2.5 md:mt-6 md:justify-start md:gap-3">
              <a
                ref={ctaRef}
                href="#conoceme"
                className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-transform active:scale-[0.98] md:px-5 md:py-3"
              >
                Conocé mi trabajo
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </a>
              <a
                href="#participa"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10 md:px-5 md:py-3"
              >
                Participá
              </a>
            </div>

            <div data-hero-in className="mt-7 hidden items-center gap-3 md:flex">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="flex size-8 items-center justify-center rounded-full text-paper/55 transition-colors hover:bg-paper/10 hover:text-paper"
                >
                  <SocialIcon icon={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative order-first min-h-0 w-full flex-1 md:order-none md:h-[88vh] md:flex-none">
            {reduceMotion ? (
              <img
                src={heroPoster}
                alt={`${SITE.name}, ${SITE.role}, saludando con el puño en alto`}
                className="absolute inset-0 h-full w-full object-contain mix-blend-screen"
              />
            ) : (
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                poster={heroPoster}
                aria-label={`${SITE.name} girando y saludando con el puño en alto`}
                className="absolute inset-0 h-full w-full object-contain mix-blend-screen"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}
