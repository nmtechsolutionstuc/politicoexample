import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { MISSION, VALUES, VISION } from '../data/content'

export default function VisionMisionValores() {
  const statementsRef = useScrollReveal<HTMLDivElement>({ y: 18, stagger: 0.1 })
  const valuesRef = useScrollReveal<HTMLDivElement>({ y: 14, stagger: 0.05, start: 'top 88%' })

  return (
    <section id="vision" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading title="Visión, misión y valores" />

        <div ref={statementsRef} className="mt-10 grid gap-5 md:grid-cols-2">
          <div data-reveal className="rounded-3xl border border-paper-line bg-white/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-lg hover:shadow-ink/5">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ember">{VISION.title}</p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-ink md:text-2xl">{VISION.text}</p>
          </div>
          <div data-reveal className="rounded-3xl border border-paper-line bg-white/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-lg hover:shadow-ink/5">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ember">{MISSION.title}</p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-ink md:text-2xl">{MISSION.text}</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink/45">Valores en la práctica</p>
          <div
            ref={valuesRef}
            data-reveal-group
            className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {VALUES.map((value) => (
              <div
                data-reveal
                key={value.name}
                className="relative bg-paper p-6 transition-colors duration-300 hover:bg-ember-tint/40"
              >
                <p className="font-display text-lg font-semibold text-ink">{value.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{value.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
