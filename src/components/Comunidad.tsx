import { useState } from 'react'
import { Calendar, Check, ChevronRight, MapPin } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useCountUp } from '../hooks/useCountUp'
import { AGENDA_EVENTS, INDICATORS, MAP_ZONES, TRACKING_STAGES } from '../data/content'

const MAX_PARTICIPATIONS = Math.max(...MAP_ZONES.map((z) => z.participations))
const CURRENT_STAGE_INDEX = 1

function Indicator({ value, label }: { value: number; label: string }) {
  const ref = useCountUp(value, (n) => n.toLocaleString('es-AR'))
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-ink md:text-4xl">
        <span ref={ref}>0</span>
      </p>
      <p className="mt-1 text-sm text-ink/55">{label}</p>
    </div>
  )
}

export default function Comunidad() {
  const [activeZone, setActiveZone] = useState(MAP_ZONES[0])
  const [showAgenda, setShowAgenda] = useState(false)
  const nextEvent = AGENDA_EVENTS[0]

  return (
    <section id="comunidad" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="04 · COMUNIDAD" title="Una ciudad que participa" />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {INDICATORS.map((indicator) => (
            <Indicator key={indicator.label} value={indicator.value} label={indicator.label} />
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Participación por barrio</h3>
            <p className="mt-1 text-sm text-ink/55">Tocá un barrio para ver qué temas se conversan ahí.</p>

            <div className="mt-5 space-y-2.5">
              {MAP_ZONES.map((zone) => {
                const isActive = activeZone.neighborhood === zone.neighborhood
                const width = Math.max(12, Math.round((zone.participations / MAX_PARTICIPATIONS) * 100))
                return (
                  <button
                    key={zone.neighborhood}
                    onClick={() => setActiveZone(zone)}
                    className="block w-full text-left"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${isActive ? 'text-ink' : 'text-ink/60'}`}>{zone.neighborhood}</span>
                      <span className="text-ink/45">{zone.participations}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-paper-line">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isActive ? 'bg-ember' : 'bg-ink/25'}`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-paper-dim p-4">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.25} />
              <div>
                <p className="text-sm font-semibold text-ink">{activeZone.neighborhood}</p>
                <p className="mt-0.5 text-sm text-ink/60">Temas más consultados: {activeZone.topTopics.join(', ')}.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Así se sigue una propuesta</h3>
              <p className="mt-1 text-sm text-ink/55">Ejemplo del recorrido que hace cada idea o reclamo recibido.</p>
              <div className="mt-5 flex items-center">
                {TRACKING_STAGES.map((stage, index) => {
                  const done = index <= CURRENT_STAGE_INDEX
                  const isLast = index === TRACKING_STAGES.length - 1
                  return (
                    <div key={stage} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                            done ? 'bg-ember text-ink' : 'bg-paper-line text-ink/40'
                          }`}
                        >
                          {done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
                        </span>
                        <span className="max-w-16 text-center text-[10px] font-medium leading-tight text-ink/50">{stage}</span>
                      </div>
                      {isLast ? null : <div className={`mx-1 h-0.5 flex-1 ${index < CURRENT_STAGE_INDEX ? 'bg-ember' : 'bg-paper-line'}`} />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-paper-line p-5">
              <div className="flex items-start gap-2.5">
                <Calendar className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.25} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">Próxima actividad</p>
                  <h4 className="mt-1 font-display text-base font-semibold text-ink">{nextEvent.title}</h4>
                  <p className="mt-0.5 text-sm text-ink/60">
                    {nextEvent.date} · {nextEvent.place}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#participa"
                  className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"
                >
                  Quiero participar
                </a>
                <button
                  onClick={() => setShowAgenda((v) => !v)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ink"
                >
                  {showAgenda ? 'Ocultar agenda' : 'Ver agenda completa'}
                  <ChevronRight className={`size-4 transition-transform ${showAgenda ? 'rotate-90' : ''}`} strokeWidth={2.25} />
                </button>
              </div>

              {showAgenda ? (
                <ul className="mt-4 space-y-3 border-t border-paper-line pt-4">
                  {AGENDA_EVENTS.slice(1).map((event) => (
                    <li key={event.title}>
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
        </div>
      </Container>
    </section>
  )
}
