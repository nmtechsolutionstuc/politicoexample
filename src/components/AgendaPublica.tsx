import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AGENDA_EVENTS } from '../data/content'

export default function AgendaPublica() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.06, start: 'top 85%' })

  return (
    <section id="agenda" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Encontrémonos"
          title="Agenda pública"
          description="Recorridas, foros y encuentros abiertos con vecinos de distintos barrios de la ciudad."
        />

        <div ref={ref} data-reveal-group className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENDA_EVENTS.map((event) => (
            <div
              data-reveal
              key={event.title}
              className="group flex flex-col rounded-3xl border border-paper-line bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-lg hover:shadow-ink/5"
            >
              <p className="flex items-center gap-2 text-xs font-semibold text-ember">
                <CalendarDays className="size-3.5" strokeWidth={2.25} />
                {event.date}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{event.title}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-ink/45">
                <MapPin className="size-3.5" strokeWidth={2} />
                {event.place}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{event.description}</p>
              <a href="#contacto" className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ember">
                Quiero participar
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.25} />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
