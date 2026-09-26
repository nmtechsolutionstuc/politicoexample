import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BIO_PARAGRAPHS, MOTIVATION, TRAJECTORY, type TrajectoryItem } from '../data/content'
import photo1 from '../assets/images/politico-1.webp'
import photo2 from '../assets/images/politico-2.webp'
import photo3 from '../assets/images/politico-3.webp'
import photo4 from '../assets/images/politico-4.webp'

const QUICK_FACTS = [
  { label: 'Barrio', value: 'Villa 9 de Julio' },
  { label: 'Profesión', value: 'Ingeniero Industrial (UTN)' },
  { label: 'En el barrio desde', value: '2014' },
  { label: 'Familia', value: 'Carolina, Bautista y Delfina' },
]

const TIMELINE_IMAGES = [photo3, photo2, photo1, photo4]
const FEATURED_YEARS = ['2014', '2019', '2022', '2025']
const FEATURED = FEATURED_YEARS.map((year) => TRAJECTORY.find((item) => item.year === year)!).filter(Boolean)

export default function Conoceme() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<TrajectoryItem>(FEATURED[0])
  const bioRef = useScrollReveal<HTMLDivElement>()
  const railRef = useScrollReveal<HTMLDivElement>({ y: 16 })

  const selectedIndex = TRAJECTORY.indexOf(selected)

  return (
    <section id="conoceme" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="01 · CONOCEME" title="Una historia muy de acá" />

        {/* Photo, story and quote are grid siblings so phones read photo → story → quote,
            while desktop keeps the quote tucked under the photo in the left column. */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:col-start-1 lg:row-start-1">
              {TIMELINE_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden={i !== selectedIndex % TIMELINE_IMAGES.length}
                  className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-700 ${
                    i === selectedIndex % TIMELINE_IMAGES.length ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-display text-2xl font-semibold text-paper">{selected.year}</span>
                <p className="text-sm text-paper/80">{selected.role}</p>
              </div>
            </div>

          <div className="flex flex-col gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div ref={bioRef} className="space-y-4">
              {BIO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink/70 md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-paper-line py-5">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/65">{fact.label}</dt>
                  <dd className="mt-0.5 font-display text-sm font-semibold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Trayectoria</h3>

              <div ref={railRef} className="mt-4 flex gap-2">
                {FEATURED.map((item) => {
                  const isActive = item === selected
                  return (
                    <button
                      key={item.year}
                      onClick={() => setSelected(item)}
                      className={`flex-1 rounded-xl border px-3 py-3 text-left transition-colors ${
                        isActive ? 'border-ink bg-ink text-paper' : 'border-paper-line text-ink/65 hover:border-ink/30'
                      }`}
                    >
                      <span className="font-display text-sm font-semibold">{item.year}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-paper-dim p-5">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-display text-base font-semibold text-ink">{selected.title}</h4>
                    <StatusPill status={selected.status} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{selected.detail}</p>
                </div>
              </div>

              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-ember-deep"
              >
                {expanded ? 'Ver menos' : 'Ver trayectoria completa'}
                <ChevronDown className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} strokeWidth={2.25} />
              </button>

              {expanded ? (
                <ul className="mt-4 space-y-0.5 border-t border-paper-line pt-4">
                  {TRAJECTORY.map((item) => (
                    <li key={item.year + item.title}>
                      <button
                        onClick={() => setSelected(item)}
                        className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-paper-dim ${
                          item === selected ? 'text-ink' : 'text-ink/65'
                        }`}
                      >
                        <span className="w-10 shrink-0 font-display font-semibold">{item.year}</span>
                        <span className="flex-1 leading-snug">{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <figure className="relative self-start rounded-2xl bg-paper-dim p-6 lg:col-start-1 lg:row-start-2">
            <Quote className="size-6 text-ember-deep" strokeWidth={2} aria-hidden />
            <blockquote className="mt-3 font-script text-2xl leading-snug text-ink/85">{MOTIVATION.lessons}</blockquote>
          </figure>
        </div>
      </Container>
    </section>
  )
}
