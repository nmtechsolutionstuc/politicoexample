import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import RevealImage from './RevealImage'
import StatusPill from './StatusPill'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BIO_PARAGRAPHS, MOTIVATION, SITE, TRAJECTORY } from '../data/content'
import mainPhoto from '../assets/images/politico-3.webp'

const QUICK_FACTS = [
  { label: 'Barrio', value: 'Villa 9 de Julio' },
  { label: 'Profesión', value: 'Ingeniero Industrial (UTN)' },
  { label: 'En el barrio desde', value: '2014' },
  { label: 'Familia', value: 'Carolina, Bautista y Delfina' },
]

function TimelineRow({ item }: { item: (typeof TRAJECTORY)[number] }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="flex gap-4 py-4">
      <div className="flex w-14 shrink-0 flex-col items-center pt-0.5">
        <span className="font-display text-sm font-semibold text-ink/40">{item.year}</span>
        <span className="mt-2 h-full w-px flex-1 bg-ink-line/60" aria-hidden />
      </div>
      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-display text-base font-semibold text-ink">{item.title}</h4>
          <StatusPill status={item.status} />
        </div>
        <p className="mt-1 text-sm text-ink/60">{item.description}</p>
      </div>
    </div>
  )
}

export default function Conoceme() {
  const [expanded, setExpanded] = useState(false)
  const bioRef = useScrollReveal<HTMLDivElement>()
  const factsRef = useScrollReveal<HTMLDivElement>()
  const quoteRef = useScrollReveal<HTMLDivElement>()
  const visibleTrajectory = expanded ? TRAJECTORY : TRAJECTORY.slice(-3)

  return (
    <section id="conoceme" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="01 · CONOCEME" title="Una historia muy de acá" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="flex flex-col gap-6">
            <RevealImage
              src={mainPhoto}
              alt={`${SITE.name} en una reunión vecinal, revisando un mapa de barrio junto a vecinas`}
              className="aspect-[4/5] rounded-3xl"
            />
            <div ref={quoteRef} className="relative rounded-2xl bg-paper-dim p-6">
              <Quote className="size-6 text-ember" strokeWidth={2} aria-hidden />
              <p className="mt-3 font-script text-2xl leading-snug text-ink/85">{MOTIVATION.lessons}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div ref={bioRef} className="space-y-4">
              {BIO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink/70 md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div ref={factsRef} className="grid grid-cols-2 gap-4 border-y border-paper-line py-6 sm:grid-cols-4">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">{fact.label}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-ink">{fact.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Trayectoria</h3>
              <div className="mt-1 divide-y divide-paper-line">
                {visibleTrajectory.map((item) => (
                  <TimelineRow key={item.year + item.title} item={item} />
                ))}
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-ember"
              >
                {expanded ? 'Ver menos' : 'Ver trayectoria completa'}
                <ChevronDown className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
