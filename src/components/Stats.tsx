import { useCountUp } from '../hooks/useCountUp'
import Container from './Container'
import { STATS } from '../data/content'

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useCountUp(value, (n) => n.toLocaleString('es-AR'), index * 0.12)

  return (
    <div className="bg-ink-soft px-1 py-2">
      <p className="font-display text-4xl font-semibold text-paper sm:text-5xl">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-snug text-paper/55">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="bg-ink-soft py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/10 pt-8 md:grid-cols-4 md:gap-x-10 md:border-t-0 md:pt-0">
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
