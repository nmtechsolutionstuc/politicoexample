import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import RevealImage from './RevealImage'
import heroPhoto from '../assets/images/politico-4.webp'
import { SITE, SOCIAL_LINKS } from '../data/content'

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-hero-item]', { opacity: 0, y: reduceMotion ? 0 : 22 })
      tl.to('[data-hero-item]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 })

      if (!reduceMotion) {
        tl.fromTo('[data-hero-frame]', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.15)
        tl.fromTo('[data-hero-badge]', { opacity: 0, scale: 0.5, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.7 }, 0.75)
        gsap.to('[data-hero-badge]', { y: -6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 })
      }
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={scope} className="relative overflow-hidden bg-ink pb-16 pt-28 md:pb-24 md:pt-32 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-10 size-[26rem] rounded-full bg-ember/20 blur-[110px] animate-float-slow" />
        <div className="absolute -left-16 bottom-0 size-72 rounded-full bg-forest/25 blur-[100px] animate-float-slow [animation-delay:-4s]" />
      </div>

      <Container className="relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div>
          <p data-hero-item className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-soft">
            {SITE.party} · {SITE.district}
          </p>

          <h1 className="font-display leading-[0.98] tracking-tight text-paper">
            <span data-hero-item className="block text-5xl font-semibold sm:text-6xl lg:text-7xl">
              {SITE.name}
            </span>
            <span data-hero-item className="mt-2 block text-2xl font-medium text-paper/75 sm:text-3xl lg:text-4xl">
              {SITE.role}
            </span>
          </h1>

          <p data-hero-item className="mt-7 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
            {SITE.heroStatement}
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#quien-soy"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-paper transition-transform active:scale-[0.98]"
            >
              Conocé su historia
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </a>
            <a
              href="#propuestas"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Ver propuestas
            </a>
            <a
              href="#participa"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Quiero participar
            </a>
          </div>

          <div data-hero-item className="mt-11 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-6">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-paper/45">Canales oficiales</span>
            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="flex size-9 items-center justify-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper"
                >
                  <SocialIcon icon={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            data-hero-frame
            aria-hidden
            className="absolute -inset-3 rounded-[2.5rem] border border-ember/25 sm:-inset-4"
          />
          <RevealImage
            src={heroPhoto}
            alt={`${SITE.name} conversando con vecinas en un barrio de San Miguel de Tucumán`}
            className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl shadow-ink"
          />
          <div
            data-hero-badge
            className="absolute -bottom-6 -left-5 flex size-20 items-center justify-center rounded-full border-4 border-ink bg-ember font-display text-lg font-semibold text-paper shadow-xl shadow-ink sm:-bottom-7 sm:-left-7 sm:size-24"
          >
            {SITE.initials}
          </div>
        </div>
      </Container>
    </section>
  )
}
