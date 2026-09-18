import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Check } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { inputClass } from './FormField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { COMMUNITY_PROPOSALS, TRACKING_STAGES } from '../data/content'

export default function Seguimiento() {
  const [selectedId, setSelectedId] = useState(COMMUNITY_PROPOSALS[1].id)
  const ref = useScrollReveal<HTMLDivElement>({ start: 'top 85%' })
  const stagesRef = useRef<HTMLDivElement>(null)
  const selected = COMMUNITY_PROPOSALS.find((p) => p.id === selectedId) ?? COMMUNITY_PROPOSALS[0]
  const currentIndex = TRACKING_STAGES.indexOf(selected.status)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !stagesRef.current) return
    const dots = stagesRef.current.querySelectorAll('[data-stage-dot]')
    gsap.fromTo(
      dots,
      { scale: 0.6, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.06 },
    )
  }, [selectedId])

  return (
    <section id="seguimiento" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Seguimiento de propuestas"
          description="Elegí una propuesta enviada por vecinos y mirá en qué etapa se encuentra."
        />

        <div className="mt-9 max-w-sm">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className={`${inputClass} appearance-none bg-white`}
          >
            {COMMUNITY_PROPOSALS.map((proposal) => (
              <option key={proposal.id} value={proposal.id}>
                {proposal.title}
              </option>
            ))}
          </select>
        </div>

        <div ref={ref} className="mt-10 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{selected.neighborhood} · {selected.category}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink md:text-2xl">{selected.title}</h3>
            </div>
          </div>

          <div ref={stagesRef} className="mt-10 md:px-2">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-2">
              <div className="absolute left-[15px] top-3 hidden h-[2px] w-[calc(100%-30px)] bg-paper-line md:block">
                <div
                  className="h-full bg-ember transition-all duration-500"
                  style={{ width: `${(currentIndex / (TRACKING_STAGES.length - 1)) * 100}%` }}
                />
              </div>
              {TRACKING_STAGES.map((stage, index) => {
                const done = index < currentIndex
                const current = index === currentIndex
                return (
                  <div key={stage} className="relative flex items-center gap-3 md:flex-1 md:flex-col md:items-center md:text-center">
                    <span
                      data-stage-dot
                      className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                        done
                          ? 'border-ember bg-ember text-paper'
                          : current
                            ? 'border-ember bg-paper text-ember'
                            : 'border-paper-line bg-paper text-ink/35'
                      }`}
                    >
                      {done ? <Check className="size-4" strokeWidth={2.5} /> : index + 1}
                    </span>
                    <span className={`text-sm font-medium md:mt-3 ${current ? 'text-ember' : done ? 'text-ink' : 'text-ink/45'}`}>
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
