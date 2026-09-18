import { FileText, ClipboardList, ShieldCheck, ExternalLink, ArrowUpRight } from 'lucide-react'
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

export default function Transparencia() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 12, stagger: 0.05, start: 'top 85%' })

  return (
    <section id="transparencia" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Todo a la vista"
          title="Transparencia"
          description="Proyectos, informes de actividad, declaraciones y enlaces oficiales, ordenados y a disposición de cualquier vecino."
        />

        <div ref={ref} data-reveal-group className="mt-11 divide-y divide-paper-line rounded-3xl border border-paper-line bg-white/50">
          {TRANSPARENCY_DOCS.map((doc) => {
            const Icon = TYPE_ICON[doc.type]
            return (
              <a
                data-reveal
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
      </Container>
    </section>
  )
}
