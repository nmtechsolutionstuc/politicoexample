import { Check, X } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CANDIDACY } from '../data/content'

const FACTS = [
  { label: 'Cargo', value: CANDIDACY.role },
  { label: 'Distrito', value: CANDIDACY.district },
  { label: 'Espacio político', value: CANDIDACY.party },
  { label: 'Postulación', value: `${CANDIDACY.listNumber} · ${CANDIDACY.period}` },
]

export default function Candidatura() {
  const factsRef = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.08 })
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 18, stagger: 0.06, start: 'top 85%' })

  return (
    <section id="candidatura" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading title="Candidatura" description="La información concreta de a qué se postula Martín, y desde qué espacio." />

        <div ref={factsRef} data-reveal-group className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line md:grid-cols-4">
          {FACTS.map((fact) => (
            <div data-reveal key={fact.label} className="bg-paper px-5 py-6 transition-colors duration-300 hover:bg-ember-tint/40">
              <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{fact.label}</p>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{fact.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">¿Qué hace realmente un concejal?</h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/65">
            Una explicación simple, para que este espacio no prometa lo que el cargo no puede cumplir.
          </p>

          <div ref={gridRef} className="mt-9 grid gap-5 md:grid-cols-2">
            <div data-reveal className="rounded-3xl border border-forest/20 bg-forest-soft/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
              <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.08em] text-forest">
                <Check className="size-4" strokeWidth={2.5} /> Sí puede
              </p>
              <ul className="mt-5 space-y-4">
                {CANDIDACY.councilFunctions.map((item) => (
                  <li key={item.slice(0, 20)} className="text-sm leading-relaxed text-ink/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="rounded-3xl border border-ink/10 bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
              <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.08em] text-ink/55">
                <X className="size-4" strokeWidth={2.5} /> No depende de este cargo
              </p>
              <ul className="mt-5 space-y-4">
                {CANDIDACY.councilLimits.map((item) => (
                  <li key={item.slice(0, 20)} className="text-sm leading-relaxed text-ink/65">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
