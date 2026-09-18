import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { MAP_ZONES } from '../data/content'

const MAX = Math.max(...MAP_ZONES.map((z) => z.participations))

export default function MapaParticipacion() {
  const [selected, setSelected] = useState(MAP_ZONES[2].neighborhood)
  const ref = useScrollReveal<HTMLDivElement>({ y: 14, stagger: 0.05, start: 'top 85%' })
  const panelRef = useRef<HTMLDivElement>(null)
  const zone = MAP_ZONES.find((z) => z.neighborhood === selected) ?? MAP_ZONES[0]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !ref.current) return

    const bars = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-bar-fill]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const bar = entry.target as HTMLElement
          const target = bar.style.width
          gsap.fromTo(bar, { width: '0%' }, { width: target, duration: 1.1, ease: 'power3.out' })
          observer.unobserve(bar)
        })
      },
      { threshold: 0.4 },
    )
    bars.forEach((bar) => observer.observe(bar))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !panelRef.current) return
    gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [selected])

  return (
    <section id="mapa" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Mapa de participación"
          description="Cuántas participaciones llegaron desde cada barrio a través de esta plataforma, y sobre qué temas."
        />
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink/45">
          Los datos representan únicamente participaciones recibidas mediante esta plataforma, no una medición de la opinión general del
          barrio.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div ref={ref} data-reveal-group className="space-y-2.5">
            {MAP_ZONES.map((z) => (
              <button
                data-reveal
                key={z.neighborhood}
                onClick={() => setSelected(z.neighborhood)}
                className={`group relative block w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  selected === z.neighborhood ? 'border-ember/50 bg-ember-tint/40' : 'border-paper-line bg-white/50 hover:border-ember/30'
                }`}
              >
                <span
                  data-bar-fill
                  className="absolute inset-y-0 left-0 bg-ember/10"
                  style={{ width: `${(z.participations / MAX) * 100}%` }}
                  aria-hidden
                />
                <span className="relative flex items-center justify-between gap-4">
                  <span className="font-display text-base font-semibold text-ink md:text-lg">{z.neighborhood}</span>
                  <span className="font-display text-sm font-semibold text-ember">{z.participations}</span>
                </span>
              </button>
            ))}
          </div>

          <div ref={panelRef} className="h-fit rounded-3xl border border-paper-line bg-ink p-8 text-paper">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-soft">Zona seleccionada</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">{zone.neighborhood}</h3>
            <p className="mt-1 text-sm text-paper/60">{zone.participations} participaciones recibidas</p>
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-paper/45">Temas más mencionados</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {zone.topTopics.map((topic) => (
                <li key={topic} className="rounded-full border border-paper/15 px-3 py-1.5 text-sm text-paper/80">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
