import { useState } from 'react'
import { Calendar, Check, ChevronRight } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useCountUp } from '../hooks/useCountUp'
import { AGENDA_EVENTS, COMMUNITY_PROPOSALS, INDICATORS, MAP_ZONES, TRACKING_STAGES } from '../data/content'
import agendaPhoto from '../assets/images/politico-3.webp'

const CURRENT_STAGE_INDEX = 1
// Proportional bento only from `sm` up: at phone width a 1-of-4 column is ~70px and the
// barrio names break letter by letter, so phones get an even 2x3 grid instead.
const ZONE_SPANS = ['sm:col-span-2 sm:row-span-2', 'sm:col-span-2', 'sm:col-span-1', 'sm:col-span-1', 'sm:col-span-2', 'sm:col-span-2']
const ZONE_TINTS = ['bg-ink', 'bg-ink-soft', 'bg-ink-line', 'bg-ink-line', 'bg-ink-soft', 'bg-ink-soft']

function Badge({ value, label }: { value: number; label: string }) {
  const ref = useCountUp(value, (n) => n.toLocaleString('es-AR'))
  return (
    <div className="rounded-full border border-paper-line bg-white px-4 py-2 shadow-sm">
      <span className="font-display text-base font-semibold text-ink">
        <span ref={ref}>0</span>
      </span>
      <span className="ml-1.5 text-xs text-ink/55">{label}</span>
    </div>
  )
}

export default function Comunidad() {
  const [activeZone, setActiveZone] = useState(MAP_ZONES[0])
  const [showAgenda, setShowAgenda] = useState(false)
  const nextEvent = AGENDA_EVENTS[0]
  const featuredProposal = COMMUNITY_PROPOSALS.find((p) => p.neighborhood === activeZone.neighborhood)

  return (
    <section id="comunidad" className="bg-paper py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="04 · COMUNIDAD" title="Una ciudad que participa" />
          <div className="flex flex-wrap gap-2">
            {INDICATORS.map((indicator) => (
              <Badge key={indicator.label} value={indicator.value} label={indicator.label} />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div>
            <p className="mb-4 text-sm text-ink/55">Tocá un barrio para ver qué se está conversando ahí.</p>
            <div className="grid grid-cols-2 auto-rows-[5rem] gap-2.5 sm:grid-cols-4 sm:auto-rows-[7.5rem]">
              {MAP_ZONES.map((zone, i) => {
                const isActive = activeZone.neighborhood === zone.neighborhood
                return (
                  <button
                    key={zone.neighborhood}
                    onClick={() => setActiveZone(zone)}
                    className={`relative flex flex-col justify-end overflow-hidden rounded-2xl p-3.5 text-left transition-all sm:p-4 ${ZONE_SPANS[i]} ${ZONE_TINTS[i]} ${
                      isActive ? 'ring-2 ring-ember ring-offset-2 ring-offset-paper' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span className="font-display text-sm font-semibold text-paper sm:text-base">{zone.neighborhood}</span>
                    <span className="text-xs text-paper/60">{zone.participations} participaciones</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div key={activeZone.neighborhood} className="animate-fade-in rounded-2xl border border-paper-line p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">{activeZone.neighborhood}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                Temas más consultados: {activeZone.topTopics.join(', ')}.
              </p>
              {featuredProposal ? (
                <div className="mt-4 border-t border-paper-line pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/40">Propuesta destacada</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{featuredProposal.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/60">{featuredProposal.description}</p>
                </div>
              ) : null}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">Así se sigue una propuesta</p>
              <div className="mt-3 flex items-center">
                {TRACKING_STAGES.map((stage, index) => {
                  const done = index <= CURRENT_STAGE_INDEX
                  const isLast = index === TRACKING_STAGES.length - 1
                  return (
                    <div key={stage} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
                      <span
                        title={stage}
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          done ? 'bg-ember text-ink' : 'bg-paper-line text-ink/40'
                        }`}
                      >
                        {done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
                      </span>
                      {isLast ? null : <div className={`mx-1 h-0.5 flex-1 ${index < CURRENT_STAGE_INDEX ? 'bg-ember' : 'bg-paper-line'}`} />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <img src={agendaPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
              <div className="relative p-5">
                <div className="flex items-start gap-2.5">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-ember-soft" strokeWidth={2.25} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-paper/60">Próxima actividad</p>
                    <h4 className="mt-1 font-display text-base font-semibold text-paper">{nextEvent.title}</h4>
                    <p className="mt-0.5 text-sm text-paper/70">
                      {nextEvent.date} · {nextEvent.place}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setShowAgenda((v) => !v)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-paper/75 hover:text-paper"
                  >
                    {showAgenda ? 'Ocultar agenda' : 'Ver agenda completa'}
                    <ChevronRight className={`size-4 transition-transform ${showAgenda ? 'rotate-90' : ''}`} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </div>

            {showAgenda ? (
              <ul className="space-y-3">
                {AGENDA_EVENTS.slice(1).map((event) => (
                  <li key={event.title} className="border-t border-paper-line pt-3">
                    <p className="text-sm font-semibold text-ink">{event.title}</p>
                    <p className="text-sm text-ink/55">
                      {event.date} · {event.place}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
