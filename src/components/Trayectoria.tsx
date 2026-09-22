import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Plus } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import RevealImage from './RevealImage'
import trayectoriaPhoto from '../assets/images/politico-1.webp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SITE, TRAJECTORY, type TrajectoryItem } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function TimelineCard({ item, align }: { item: TrajectoryItem; align: 'left' | 'right' }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`rounded-3xl border border-paper-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-lg hover:shadow-ink/5 md:p-7 ${align === 'right' ? 'md:text-right' : ''}`}
    >
      <div className={`flex flex-wrap items-center gap-2 ${align === 'right' ? 'md:justify-end' : ''}`}>
        <span className="font-display text-sm font-semibold text-ember">{item.year}</span>
        <StatusPill status={item.status} />
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-ink md:text-xl">{item.title}</h3>
      <p className="mt-1 text-sm font-medium text-ink/50">{item.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ember ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
        aria-expanded={open}
      >
        {open ? 'Ver menos' : 'Ampliar información'}
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="mt-3 border-t border-paper-line pt-3 text-sm leading-relaxed text-ink/65">{item.detail}</p>
        </div>
      </div>
    </div>
  )
}

const VISIBLE_COUNT = 4

export default function Trayectoria() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const headingRef = useScrollReveal<HTMLDivElement>()
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? TRAJECTORY : TRAJECTORY.slice(0, VISIBLE_COUNT)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !showAll || !containerRef.current) return
    const extras = containerRef.current.querySelectorAll('[data-extra-item]')
    gsap.fromTo(extras, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
  }, [showAll])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !containerRef.current || !progressRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="trayectoria" className="bg-paper py-14 md:py-20">
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Una década de trabajo territorial"
            title="Trayectoria"
            description="Proyectos, gestiones y actividad comunitaria de Martín antes de ser candidato."
          />
        </div>

        <RevealImage
          src={trayectoriaPhoto}
          alt={`${SITE.name} supervisando una obra de pavimentación junto a trabajadores municipales`}
          className="mt-10 aspect-[21/9] w-full rounded-[2rem] shadow-xl shadow-ink/10"
        />

        <div ref={containerRef} className="relative mt-14">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-paper-line md:left-1/2 md:-translate-x-1/2">
            <div ref={progressRef} className="w-px bg-ember" style={{ height: '0%' }} />
          </div>

          <div className="space-y-10 md:space-y-14">
            {items.map((item, index) => {
              const align = index % 2 === 0 ? 'right' : 'left'
              const isExtra = index >= VISIBLE_COUNT
              return (
                <div
                  key={item.year + item.title}
                  data-extra-item={isExtra ? true : undefined}
                  className="relative pl-11 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                >
                  <span className="absolute left-2.5 top-7 size-3 -translate-x-1/2 rounded-full border-2 border-ember bg-paper md:left-1/2" />
                  {align === 'right' ? (
                    <>
                      <div className="hidden md:block" />
                      <TimelineCard item={item} align="left" />
                    </>
                  ) : (
                    <>
                      <TimelineCard item={item} align="right" />
                      <div className="hidden md:block" />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {!showAll && TRAJECTORY.length > VISIBLE_COUNT ? (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-white/50 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              Ver toda la trayectoria
              <Plus className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
