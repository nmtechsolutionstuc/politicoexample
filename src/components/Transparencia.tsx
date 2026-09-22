import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { FileText, ClipboardList, ShieldCheck, ExternalLink, ArrowUpRight, Plus } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TRANSPARENCY_DOCS, type TransparencyDoc } from '../data/content'

const TYPE_ICON: Record<TransparencyDoc['type'], typeof FileText> = {
  Proyecto: FileText,
  Informe: ClipboardList,
  Declaración: ShieldCheck,
  'Enlace oficial': ExternalLink,
}

const VISIBLE_COUNT = 4

export default function Transparencia() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 12, stagger: 0.05, start: 'top 85%' })
  const [showAll, setShowAll] = useState(false)
  const docs = showAll ? TRANSPARENCY_DOCS : TRANSPARENCY_DOCS.slice(0, VISIBLE_COUNT)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !showAll || !ref.current) return
    const extras = ref.current.querySelectorAll('[data-extra-item]')
    gsap.fromTo(extras, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll])

  return (
    <section id="transparencia" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Todo a la vista"
          title="Transparencia"
          description="Proyectos, informes de actividad, declaraciones y enlaces oficiales, ordenados y a disposición de cualquier vecino."
        />

        <div ref={ref} data-reveal-group className="mt-11 divide-y divide-paper-line rounded-3xl border border-paper-line bg-white/50">
          {docs.map((doc, index) => {
            const Icon = TYPE_ICON[doc.type]
            return (
              <a
                data-reveal
                data-extra-item={index >= VISIBLE_COUNT ? true : undefined}
                key={doc.title}
                href="#"
                className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-ember-tint/30 md:px-7"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-display text-base font-semibold text-ink">{doc.title}</span>
                    <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[11px] font-semibold text-ink/55">{doc.type}</span>
                  </span>
                  <span className="mt-1 block text-sm text-ink/60">{doc.description}</span>
                  <span className="mt-1 block text-xs text-ink/40">{doc.date}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" strokeWidth={2.25} />
              </a>
            )
          })}
        </div>

        {!showAll && TRANSPARENCY_DOCS.length > VISIBLE_COUNT ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-white/50 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              Ver todos los documentos
              <Plus className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
