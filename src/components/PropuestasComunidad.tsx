import { useMemo, useState } from 'react'
import { Check, ChevronDown, MapPin, Plus, ThumbsUp } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { COMMUNITY_PROPOSALS, IDEA_CATEGORIES, TRACKING_STAGES, type CommunityProposal } from '../data/content'

const FILTERS = ['Todas', ...IDEA_CATEGORIES]
const VISIBLE_COUNT = 4

function TrackingStrip({ proposal }: { proposal: CommunityProposal }) {
  const currentIndex = TRACKING_STAGES.indexOf(proposal.status)

  return (
    <div className="mt-5 border-t border-paper-line pt-5">
      <div className="relative flex items-start justify-between gap-1">
        <div className="absolute left-[14px] right-[14px] top-[13px] h-px bg-paper-line">
          <div
            className="h-full bg-ember transition-all duration-500"
            style={{ width: `${(currentIndex / (TRACKING_STAGES.length - 1)) * 100}%` }}
          />
        </div>
        {TRACKING_STAGES.map((stage, index) => {
          const done = index < currentIndex
          const current = index === currentIndex
          return (
            <div key={stage} className="relative flex flex-1 flex-col items-center text-center">
              <span
                className={`z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold ${
                  done
                    ? 'border-ember bg-ember text-paper'
                    : current
                      ? 'border-ember bg-paper text-ember'
                      : 'border-paper-line bg-paper text-ink/35'
                }`}
              >
                {done ? <Check className="size-3.5" strokeWidth={2.5} /> : index + 1}
              </span>
              <span className={`mt-2 text-[11px] font-medium leading-tight ${current ? 'text-ember' : done ? 'text-ink' : 'text-ink/40'}`}>
                {stage}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PropuestasComunidad() {
  const [filter, setFilter] = useState('Todas')
  const [showAll, setShowAll] = useState(false)
  const [supported, setSupported] = useState<Record<string, boolean>>({})
  const [tracking, setTracking] = useState<string | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(COMMUNITY_PROPOSALS.map((p) => [p.id, p.supports])),
  )
  const listRef = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.06, start: 'top 85%' })

  const filtered = useMemo(
    () => (filter === 'Todas' ? COMMUNITY_PROPOSALS : COMMUNITY_PROPOSALS.filter((p) => p.category === filter)),
    [filter],
  )
  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT)

  function selectFilter(item: string) {
    setFilter(item)
    setShowAll(false)
  }

  function toggleSupport(id: string) {
    setSupported((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      setCounts((c) => ({ ...c, [id]: c[id] + (next[id] ? 1 : -1) }))
      return next
    })
  }

  return (
    <section id="comunidad" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading
          title="Propuestas de la comunidad"
          description="Ideas enviadas por vecinos a través de esta plataforma, con su estado de seguimiento."
        />
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink/45">
          Los apoyos son una forma de interacción dentro de esta plataforma. No representan una encuesta ni la opinión general de la
          población.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => selectFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === item ? 'border-ember bg-ember text-paper' : 'border-paper-line bg-white/50 text-ink/65 hover:border-ember/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div ref={listRef} key={filter} data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-2">
          {visible.map((proposal) => {
            const isTracking = tracking === proposal.id
            return (
              <div
                data-reveal
                key={proposal.id}
                className="flex flex-col rounded-3xl border border-paper-line bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-lg hover:shadow-ink/5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ember-tint px-2.5 py-0.5 text-[11px] font-semibold text-ember">{proposal.category}</span>
                  <StatusPill status={proposal.status} />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{proposal.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-ink/45">
                  <MapPin className="size-3.5" strokeWidth={2} />
                  {proposal.neighborhood}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{proposal.description}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleSupport(proposal.id)}
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-90 ${
                      supported[proposal.id]
                        ? 'border-ember bg-ember text-paper'
                        : 'border-paper-line bg-white text-ink/70 hover:border-ember/40'
                    }`}
                  >
                    <ThumbsUp className="size-3.5" strokeWidth={2.25} />
                    {counts[proposal.id]} apoyos
                  </button>
                  <button
                    onClick={() => setTracking(isTracking ? null : proposal.id)}
                    className="inline-flex w-fit items-center gap-1.5 rounded-full border border-paper-line bg-white px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-ember/40"
                    aria-expanded={isTracking}
                  >
                    Ver seguimiento
                    <ChevronDown className={`size-3.5 transition-transform ${isTracking ? 'rotate-180' : ''}`} strokeWidth={2.25} />
                  </button>
                </div>

                <div className={`grid transition-all duration-300 ${isTracking ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <TrackingStrip proposal={proposal} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {!showAll && filtered.length > VISIBLE_COUNT ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-white/50 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              Ver más propuestas
              <Plus className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
