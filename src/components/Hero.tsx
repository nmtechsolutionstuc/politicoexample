import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { useMagnetic } from '../hooks/useMagnetic'
import heroPhoto from '../assets/images/politico-4.webp'
import communityPhoto from '../assets/images/politico-2.webp'
import territoryPhoto from '../assets/images/politico-1.webp'
import { SITE, SOCIAL_LINKS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Entrance: the hero content settles in on load, independent of scroll.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (reduceMotion) {
        gsap.set('[data-hero-in]', { opacity: 1, y: 0 })
      } else {
        tl.set('[data-hero-in]', { opacity: 0, y: 22 })
        tl.to('[data-hero-in]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 })
        tl.fromTo('[data-hero-photo]', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.1)
      }

      // Three short, self-contained states as the wrapper scrolls: (1) clean intro, held for
      // the first fifth of the scroll, (2) name/CTA recede and a secondary photo + line appear,
      // (3) that photo and line cross-fade into a territorial beat before scroll releases.
      if (!reduceMotion && wrapRef.current) {
        const seq = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        })
        seq
          .to('[data-hero-headline]', { opacity: 0, y: -26, duration: 1 }, 0.2)
          .to('[data-hero-cta]', { opacity: 0, y: -12, duration: 0.8 }, 0.2)
          .to('[data-hero-name]', { scale: 0.72, duration: 1 }, 0.2)
          .fromTo('[data-hero-secondary]', { opacity: 0, scale: 0.85, rotate: -6, y: 30 }, { opacity: 1, scale: 1, rotate: -3, y: 0, duration: 1 }, 0.34)
          .fromTo('[data-hero-script-1]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 0.36)
          .to('[data-hero-script-1]', { opacity: 0, y: -12, duration: 0.7 }, 0.68)
          .to('[data-hero-img-1]', { opacity: 0, duration: 0.7 }, 0.68)
          .fromTo('[data-hero-img-2]', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.68)
          .fromTo('[data-hero-script-2]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.74)
          .to('[data-hero-secondary]', { rotate: 0, duration: 0.8 }, 0.68)
          .to('[data-hero-photo]', { scale: 1.14, duration: 1.8 }, 0)
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} id="top" className="relative h-[190vh]">
      <div ref={stageRef} className="sticky top-0 h-[100dvh] overflow-hidden bg-ink">
        <img
          data-hero-photo
          src={heroPhoto}
          alt={`${SITE.name} conversando con vecinas en un barrio de San Miguel de Tucumán`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />

        <Container className="relative flex h-full flex-col justify-end pb-16 pt-24 md:pb-24">
          <div data-hero-in className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/70">
            {SITE.party} · {SITE.district}
          </div>

          <h1 data-hero-name className="font-display origin-bottom-left text-5xl font-semibold leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            <span data-hero-in className="block">
              Martín
            </span>
            <span data-hero-in className="flex items-center gap-3">
              Álvarez
              <span aria-hidden className="inline-block size-2.5 rounded-full bg-ember sm:size-3.5" />
            </span>
          </h1>

          <p data-hero-in className="mt-3 text-lg font-medium text-paper/80 sm:text-xl">
            {SITE.role} · {SITE.district}
          </p>

          <div data-hero-headline data-hero-in className="mt-5 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">
            {SITE.heroStatement}
          </div>

          <div className="pointer-events-none absolute right-6 top-[30%] hidden max-w-xs md:right-16 md:block">
            <p data-hero-script-1 aria-hidden className="-rotate-2 font-script text-3xl leading-tight text-paper/90 md:text-4xl">
              Antes de hablarte de mis propuestas, quiero contarte quién soy.
            </p>
            <p
              data-hero-script-2
              aria-hidden
              className="absolute inset-x-0 top-0 -rotate-2 font-script text-3xl leading-tight text-paper/90 opacity-0 md:text-4xl"
            >
              Diez años caminando el barrio, antes de ser candidato.
            </p>
          </div>

          <div
            data-hero-secondary
            className="pointer-events-none absolute right-6 top-[10%] hidden w-40 overflow-hidden rounded-2xl border-4 border-paper shadow-2xl shadow-ink md:right-16 md:block md:w-52"
          >
            <div className="relative aspect-[4/5] w-full">
              <img data-hero-img-1 src={communityPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              <img
                data-hero-img-2
                src={territoryPhoto}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-0"
              />
            </div>
          </div>

          <div data-hero-in data-hero-cta className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={ctaRef}
              href="#conoceme"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition-transform active:scale-[0.98]"
            >
              Conocé mi trabajo
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </a>
            <a
              href="#participa"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Participá
            </a>
          </div>

          <div data-hero-in className="mt-7 flex items-center gap-3">
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
        </Container>
      </div>
    </div>
  )
}
