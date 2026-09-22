import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { MOTIVATION } from '../data/content'

export default function PorQueMeInvolucre() {
  const quoteRef = useScrollReveal<HTMLParagraphElement>()
  const listRef = useScrollReveal<HTMLDivElement>({ y: 18, stagger: 0.1 })
  const lessonRef = useScrollReveal<HTMLDivElement>({ start: 'top 88%' })

  return (
    <section id="por-que" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading title="Por qué decidí involucrarme" />

        <p ref={quoteRef} className="mt-8 max-w-3xl font-display text-xl font-medium leading-snug text-ink md:text-2xl">
          {MOTIVATION.intro}
        </p>

        <div ref={listRef} data-reveal-group className="mt-12 divide-y divide-paper-line border-y border-paper-line">
          {MOTIVATION.situations.map((situation, index) => (
            <div data-reveal key={situation.slice(0, 20)} className="grid gap-3 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
              <span className="font-display text-3xl font-semibold text-ember/60">{String(index + 1).padStart(2, '0')}</span>
              <p className="max-w-[60ch] text-base leading-relaxed text-ink/75">{situation}</p>
            </div>
          ))}
        </div>

        <div ref={lessonRef} className="mt-12 rounded-3xl bg-ink px-7 py-8 text-paper md:px-9 md:py-10">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ember-soft">Lo que aprendí</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-paper/80 md:text-lg">{MOTIVATION.lessons}</p>
        </div>
      </Container>
    </section>
  )
}
