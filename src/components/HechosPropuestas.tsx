import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import { PRIORITIES, PROPOSALS, TRAJECTORY } from '../data/content'
import achievementPhoto from '../assets/images/politico-1.webp'

const ACHIEVEMENTS = TRAJECTORY.filter((item) => item.status === 'Finalizado' || item.status === 'En ejecución').slice(-4)

type Tab = 'hecho' | 'propongo'

function AchievementCard({ item, featured }: { item: (typeof TRAJECTORY)[number]; featured: boolean }) {
  const [open, setOpen] = useState(false)

  if (featured) {
    return (
      <div className="relative col-span-2 overflow-hidden rounded-2xl md:row-span-2">
        <img src={achievementPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="relative flex h-full min-h-64 flex-col justify-end p-6">
          <span className="font-display text-sm font-semibold text-paper/60">{item.year}</span>
          <h4 className="mt-1 font-display text-xl font-semibold text-paper">{item.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-paper/75">{item.description}</p>
          <div className="mt-3">
            <StatusPill status={item.status} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="flex flex-col rounded-2xl border border-paper/10 bg-paper/[0.04] p-5 text-left transition-colors hover:bg-paper/[0.07]"
    >
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

function PriorityPanel({
  priority,
  isActive,
  onSelect,
}: {
  priority: (typeof PRIORITIES)[number]
  isActive: boolean
  onSelect: () => void
}) {
  const proposal = useMemo(() => PROPOSALS.find((p) => p.area === priority.area), [priority.area])

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors ${
        isActive ? 'border-ember/40 bg-paper/[0.06]' : 'border-paper/10 bg-paper/[0.03]'
      }`}
    >
      <button onClick={onSelect} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">{priority.area}</span>
          <h4 className="mt-1 font-display text-lg font-semibold text-paper">{priority.title}</h4>
          <p className="mt-1 text-sm text-paper/65">{priority.summary}</p>
        </div>
        <ChevronDown className={`size-5 shrink-0 text-paper/50 transition-transform ${isActive ? 'rotate-180' : ''}`} strokeWidth={2.25} />
      </button>

      {isActive && proposal ? (
        <div className="grid gap-5 border-t border-paper/10 p-5 pt-5 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">El problema</p>
            <p className="mt-1.5 text-sm leading-relaxed text-paper/75">{proposal.problem}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">La propuesta</p>
            <p className="mt-1.5 text-sm leading-relaxed text-paper/75">{proposal.proposal}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/40">Cómo se mide</p>
            <ul className="mt-1.5 space-y-1">
              {proposal.measurement.map((line) => (
                <li key={line} className="text-sm leading-relaxed text-paper/75">
                  · {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const FEATURED_TITLES = new Set(PRIORITIES.map((p) => p.area))
const MORE_PROPOSALS = PROPOSALS.filter(
  (proposal, index) => !(FEATURED_TITLES.has(proposal.area) && PROPOSALS.findIndex((p) => p.area === proposal.area) === index),
)

export default function HechosPropuestas() {
  const [tab, setTab] = useState<Tab>('hecho')
  const [activeArea, setActiveArea] = useState<string | null>(PRIORITIES[0]?.area ?? null)
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="propuestas" className="bg-ink py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="02 · PROPUESTAS"
            title="Soluciones reales para una ciudad mejor"
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
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {ACHIEVEMENTS.map((item, index) => (
              <AchievementCard key={item.year + item.title} item={item} featured={index === 0} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-4">
            {PRIORITIES.map((priority) => (
              <PriorityPanel
                key={priority.area}
                priority={priority}
                isActive={activeArea === priority.area}
                onSelect={() => setActiveArea((current) => (current === priority.area ? null : priority.area))}
              />
            ))}

            <button
              onClick={() => setShowMore((v) => !v)}
              className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-paper/70 transition-colors hover:text-paper"
            >
              {showMore ? 'Ver menos propuestas' : 'Ver todas las propuestas'}
              <ArrowRight className={`size-4 transition-transform ${showMore ? '-rotate-90' : ''}`} strokeWidth={2.25} />
            </button>

            {showMore ? (
              <div className="grid gap-3 border-t border-paper/10 pt-5 sm:grid-cols-2">
                {MORE_PROPOSALS.map((proposal) => (
                  <div key={proposal.title} className="rounded-xl border border-paper/10 bg-paper/[0.03] p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">{proposal.area}</span>
                    <h5 className="mt-1 font-display text-sm font-semibold text-paper">{proposal.title}</h5>
                    <p className="mt-1 text-sm leading-relaxed text-paper/60">{proposal.proposal}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </section>
  )
}
