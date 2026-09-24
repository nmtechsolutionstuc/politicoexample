import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import { PRIORITIES, PROPOSALS, TRAJECTORY, type ProposalArea } from '../data/content'
import photo1 from '../assets/images/politico-1.webp'
import photo2 from '../assets/images/politico-2.webp'
import photo3 from '../assets/images/politico-3.webp'
import photo4 from '../assets/images/politico-4.webp'

const ACHIEVEMENTS = TRAJECTORY.filter((item) => item.status === 'Finalizado' || item.status === 'En ejecución').slice(-4)

const PRIORITY_IMAGES: Partial<Record<ProposalArea, string>> = {
  Seguridad: photo4,
  Empleo: photo2,
  Infraestructura: photo1,
  Educación: photo3,
  Ambiente: photo2,
}

type Tab = 'hecho' | 'propongo'

function AchievementCard({ item, featured }: { item: (typeof TRAJECTORY)[number]; featured: boolean }) {
  const [open, setOpen] = useState(false)

  if (featured) {
    return (
      <button onClick={() => setOpen((v) => !v)} className="relative overflow-hidden rounded-2xl text-left">
        <img src={photo1} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="relative flex h-full min-h-80 flex-col justify-end p-6 md:min-h-[26rem]">
          <span className="font-display text-sm font-semibold text-paper/60">{item.year}</span>
          <h4 className="mt-1 font-display text-xl font-semibold text-paper md:text-2xl">{item.title}</h4>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/75">{item.description}</p>
          <div className="mt-3 flex items-center gap-3">
            <StatusPill status={item.status} />
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-paper/60">
              {open ? 'Ver menos' : 'Ver detalle'}
              <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
            </span>
          </div>
          {open ? <p className="mt-3 max-w-md border-t border-paper/15 pt-3 text-sm leading-relaxed text-paper/80">{item.detail}</p> : null}
        </div>
      </button>
    )
  }

  return (
    <button onClick={() => setOpen((v) => !v)} className="flex flex-col border-t border-paper/10 pt-4 text-left first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-sm font-semibold text-ember">{item.year}</span>
        <StatusPill status={item.status} />
      </div>
      <h4 className="mt-2 font-display text-base font-semibold text-paper">{item.title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{item.description}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-paper/50">
        {open ? 'Ver menos' : 'Ver detalle'}
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </span>
      {open ? <p className="mt-3 border-t border-paper/10 pt-3 text-sm leading-relaxed text-paper/70">{item.detail}</p> : null}
    </button>
  )
}

const FEATURED_TITLES = new Set(PRIORITIES.map((p) => p.area))
const MORE_PROPOSALS = PROPOSALS.filter(
  (proposal, index) => !(FEATURED_TITLES.has(proposal.area) && PROPOSALS.findIndex((p) => p.area === proposal.area) === index),
)

function PropongoView() {
  const [activeArea, setActiveArea] = useState(PRIORITIES[0].area)
  const [showDepth, setShowDepth] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const priority = PRIORITIES.find((p) => p.area === activeArea)!
  const proposal = useMemo(() => PROPOSALS.find((p) => p.area === activeArea), [activeArea])
  const image = PRIORITY_IMAGES[activeArea]

  function selectArea(area: ProposalArea) {
    setActiveArea(area)
    setShowDepth(false)
  }

  return (
    <div className="mt-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-8">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {PRIORITIES.map((p) => {
            const isActive = p.area === activeArea
            return (
              <button
                key={p.area}
                onClick={() => selectArea(p.area)}
                className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-colors lg:shrink ${
                  isActive ? 'border-ember/50 bg-paper/[0.08] text-paper' : 'border-paper/10 text-paper/55 hover:border-paper/25'
                }`}
              >
                <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${isActive ? 'text-ember' : 'text-paper/40'}`}>
                  {p.area}
                </span>
                <p className="mt-0.5 whitespace-nowrap font-display text-sm font-semibold lg:whitespace-normal">{p.title}</p>
              </button>
            )
          })}
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          {image ? (
            <div className="relative h-48 sm:h-64">
              <img key={image} src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full animate-fade-in object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            </div>
          ) : null}

          <div className="bg-paper/[0.04] p-6 md:p-7">
            <h4 key={priority.title} className="animate-fade-in font-display text-2xl font-semibold text-paper">
              {priority.title}
            </h4>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper/70 md:text-base">{priority.summary}</p>

            {proposal ? (
              <div className="mt-5 space-y-4 border-t border-paper/10 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">El problema</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/75">{proposal.problem}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">La propuesta</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/75">{proposal.proposal}</p>
                </div>

                <button
                  onClick={() => setShowDepth((v) => !v)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper/50 hover:text-paper/80"
                >
                  {showDepth ? 'Ocultar implementación y medición' : 'Ver implementación y medición'}
                  <ChevronDown className={`size-3.5 transition-transform ${showDepth ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                </button>

                {showDepth ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">Cómo se implementa</p>
                      <ul className="mt-1.5 space-y-1">
                        {proposal.implementation.map((line) => (
                          <li key={line} className="text-sm leading-relaxed text-paper/70">
                            · {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">Cómo se mide</p>
                      <ul className="mt-1.5 space-y-1">
                        {proposal.measurement.map((line) => (
                          <li key={line} className="text-sm leading-relaxed text-paper/70">
                            · {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowMore((v) => !v)}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-paper/70 transition-colors hover:text-paper"
      >
        {showMore ? 'Ver menos propuestas' : 'Ver todas las propuestas'}
        <ArrowRight className={`size-4 transition-transform ${showMore ? '-rotate-90' : ''}`} strokeWidth={2.25} />
      </button>

      {showMore ? (
        <div className="mt-4 grid gap-3 border-t border-paper/10 pt-5 sm:grid-cols-2">
          {MORE_PROPOSALS.map((p) => (
            <div key={p.title} className="rounded-xl border border-paper/10 bg-paper/[0.03] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">{p.area}</span>
              <h5 className="mt-1 font-display text-sm font-semibold text-paper">{p.title}</h5>
              <p className="mt-1 text-sm leading-relaxed text-paper/60">{p.proposal}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function HechosPropuestas() {
  const [tab, setTab] = useState<Tab>('hecho')

  return (
    <section id="propuestas" className={`py-20 transition-colors duration-700 md:py-28 ${tab === 'hecho' ? 'bg-ink' : 'bg-ink-soft'}`}>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="02 · PROPUESTAS"
            title={tab === 'hecho' ? 'Lo que ya se hizo' : 'Lo que propongo para la ciudad'}
            tone="dark"
          />

          <div className="flex shrink-0 gap-1 self-start rounded-full bg-paper/[0.06] p-1">
            <button
              onClick={() => setTab('hecho')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === 'hecho' ? 'bg-paper text-ink' : 'text-paper/60 hover:text-paper'
              }`}
            >
              Lo que hice
            </button>
            <button
              onClick={() => setTab('propongo')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === 'propongo' ? 'bg-paper text-ink' : 'text-paper/60 hover:text-paper'
              }`}
            >
              Lo que propongo
            </button>
          </div>
        </div>

        {tab === 'hecho' ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
            <AchievementCard item={ACHIEVEMENTS[0]} featured />
            <div className="flex flex-col gap-4">
              {ACHIEVEMENTS.slice(1).map((item) => (
                <AchievementCard key={item.year + item.title} item={item} featured={false} />
              ))}
            </div>
          </div>
        ) : (
          <PropongoView />
        )}
      </Container>
    </section>
  )
}
