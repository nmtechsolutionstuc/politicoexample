import { useMemo, useState } from 'react'
import { ChevronDown, ListChecks, Gauge, TriangleAlert, Sparkles } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PROPOSALS, type Proposal } from '../data/content'

const AREAS = ['Todas', ...Array.from(new Set(PROPOSALS.map((p) => p.area)))]

function ProposalItem({ proposal }: { proposal: Proposal }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-paper-line py-5 first:pt-0 last:border-b-0">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-start justify-between gap-4 text-left" aria-expanded={open}>
        <span>
          <span className="mb-1.5 inline-block rounded-full bg-ember-tint px-2.5 py-0.5 text-[11px] font-semibold text-ember">
            {proposal.area}
          </span>
          <span className="block font-display text-lg font-semibold text-ink md:text-xl">{proposal.title}</span>
        </span>
        <ChevronDown className={`mt-2 size-5 shrink-0 text-ink/40 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white/60 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
                <TriangleAlert className="size-3.5" strokeWidth={2.25} /> El problema
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/75">{proposal.problem}</p>
            </div>
            <div className="rounded-2xl bg-ember-tint/60 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ember">
                <Sparkles className="size-3.5" strokeWidth={2.25} /> La propuesta
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/75">{proposal.proposal}</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
                <ListChecks className="size-3.5" strokeWidth={2.25} /> Cómo se implementaría
              </p>
              <ul className="mt-2.5 space-y-2">
                {proposal.implementation.map((step) => (
                  <li key={step.slice(0, 20)} className="text-sm leading-relaxed text-ink/70">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/60 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
                <Gauge className="size-3.5" strokeWidth={2.25} /> Cómo se podría medir
              </p>
              <ul className="mt-2.5 space-y-2">
                {proposal.measurement.map((metric) => (
                  <li key={metric.slice(0, 20)} className="text-sm leading-relaxed text-ink/70">
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Propuestas() {
  const [area, setArea] = useState('Todas')
  const headingRef = useScrollReveal<HTMLDivElement>()
  const listRef = useScrollReveal<HTMLDivElement>({ start: 'top 85%' })

  const filtered = useMemo(() => (area === 'Todas' ? PROPOSALS : PROPOSALS.filter((p) => p.area === area)), [area])

  return (
    <section id="propuestas" className="bg-paper py-14 md:py-20">
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            title="Propuestas"
            description="Cada propuesta muestra el problema que busca resolver, cómo se implementaría y cómo se podría medir su resultado."
          />
        </div>

        <div className="mt-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {AREAS.map((item) => (
            <button
              key={item}
              onClick={() => setArea(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                area === item ? 'border-ember bg-ember text-paper' : 'border-paper-line bg-white/50 text-ink/65 hover:border-ember/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div ref={listRef} key={area} className="mt-8 rounded-3xl border border-paper-line bg-paper px-6 md:px-8">
          {filtered.map((proposal) => (
            <ProposalItem key={proposal.title} proposal={proposal} />
          ))}
        </div>
      </Container>
    </section>
  )
}
