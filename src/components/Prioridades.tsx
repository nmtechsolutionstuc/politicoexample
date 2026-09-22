import { useState } from 'react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PRIORITIES } from '../data/content'

export default function Prioridades() {
  const [active, setActive] = useState(0)
  const ref = useScrollReveal<HTMLDivElement>({ start: 'top 85%' })
  const current = PRIORITIES[active]

  return (
    <section id="prioridades" className="bg-ink py-14 text-paper md:py-20">
      <Container>
        <SectionHeading tone="dark" title="Mis prioridades" description="Cinco frentes de trabajo concretos para los próximos cuatro años." />

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="flex flex-col gap-1.5">
            {PRIORITIES.map((priority, index) => (
              <button
                key={priority.title}
                onClick={() => setActive(index)}
                className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                  active === index ? 'border-ember/50 bg-paper/10' : 'border-transparent hover:bg-paper/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`font-display text-sm font-semibold ${active === index ? 'text-ember-soft' : 'text-paper/35'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base font-semibold text-paper md:text-lg">{priority.title}</span>
                </span>
                <span className="mt-1.5 block pl-8 text-sm text-paper/55">{priority.summary}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-paper/10 bg-paper/5 p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-soft">Prioridad {String(active + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">{current.title}</h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/75 md:text-lg">{current.detail}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
