import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Mic, Newspaper, PlayCircle, FileText, MessageSquareQuote, ArrowUpRight, Plus } from 'lucide-react'
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

const VISIBLE_COUNT = 3

export default function Prensa() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.06, start: 'top 85%' })
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? PRESS_ITEMS : PRESS_ITEMS.slice(0, VISIBLE_COUNT)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !showAll || !ref.current) return
    const extras = ref.current.querySelectorAll('[data-extra-item]')
    gsap.fromTo(extras, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll])

  return (
    <section id="prensa" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading title="Prensa" description="Entrevistas, notas, podcasts y comunicados de la campaña." />

        <div ref={ref} data-reveal-group className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = TYPE_ICON[item.type]
            return (
              <a
                data-reveal
                data-extra-item={index >= VISIBLE_COUNT ? true : undefined}
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

        {!showAll && PRESS_ITEMS.length > VISIBLE_COUNT ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-white/50 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              Ver más prensa
              <Plus className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
