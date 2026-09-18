import { Mic, Newspaper, PlayCircle, FileText, MessageSquareQuote, ArrowUpRight } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PRESS_ITEMS, type PressItem } from '../data/content'

const TYPE_ICON: Record<PressItem['type'], typeof Newspaper> = {
  Entrevista: MessageSquareQuote,
  Nota: Newspaper,
  Podcast: Mic,
  Comunicado: FileText,
  Video: PlayCircle,
}

export default function Prensa() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.06, start: 'top 85%' })

  return (
    <section id="prensa" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading title="Prensa" description="Entrevistas, notas, podcasts y comunicados de la campaña." />

        <div ref={ref} data-reveal-group className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS_ITEMS.map((item) => {
            const Icon = TYPE_ICON[item.type]
            return (
              <a
                data-reveal
                key={item.title}
                href="#"
                className="group flex flex-col overflow-hidden rounded-3xl border border-paper-line bg-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-lg hover:shadow-ink/10"
              >
                <div className="flex h-28 items-center justify-center bg-ink transition-colors duration-300 group-hover:bg-ink-soft">
                  <Icon className="size-8 text-ember-soft transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ember">
                    {item.type} · {item.outlet}
                  </p>
                  <h3 className="mt-2.5 flex-1 font-display text-base font-semibold leading-snug text-ink">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-ink/45">{item.date}</p>
                    <ArrowUpRight className="size-4 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" strokeWidth={2.25} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
