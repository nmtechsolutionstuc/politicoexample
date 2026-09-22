import { GraduationCap, Briefcase, MapPin, Heart, CalendarClock } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import RevealImage from './RevealImage'
import quienSoyPhoto from '../assets/images/politico-2.webp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BIO_PARAGRAPHS, SITE } from '../data/content'

const FACTS = [
  { icon: MapPin, label: 'Nació y creció en', value: 'Barrio Villa 9 de Julio' },
  { icon: GraduationCap, label: 'Formación', value: 'Ingeniería Industrial, UTN Tucumán' },
  { icon: Briefcase, label: 'Trayectoria laboral', value: 'Gestión de pyme metalúrgica familiar' },
  { icon: CalendarClock, label: 'En trabajo barrial desde', value: '2014' },
  { icon: Heart, label: 'Familia', value: 'Casado con Carolina, dos hijos' },
]

export default function QuienSoy() {
  const proseRef = useScrollReveal<HTMLDivElement>({ y: 20, stagger: 0.08 })
  const factsRef = useScrollReveal<HTMLDivElement>({ x: 24, start: 'top 85%' })

  return (
    <section id="quien-soy" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading title="Quién soy" description="Antes de la candidatura, hubo un barrio, una familia y años de trabajo territorial." />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div ref={proseRef} data-reveal-group className="space-y-5">
            {BIO_PARAGRAPHS.map((paragraph) => (
              <p data-reveal key={paragraph.slice(0, 24)} className="max-w-[62ch] text-base leading-relaxed text-ink/75 md:text-[1.05rem]">
                {paragraph}
              </p>
            ))}
          </div>

          <div ref={factsRef} className="flex h-fit flex-col gap-5">
            <RevealImage
              src={quienSoyPhoto}
              alt={`${SITE.name} conversando con vecinos y una docente en una escuela del barrio`}
              className="aspect-[4/3] w-full rounded-3xl shadow-xl shadow-ink/10"
              direction="down"
            />
            <div className="rounded-3xl border border-paper-line bg-white/50 p-6 md:p-7">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink/50">En resumen</p>
              <ul className="mt-5 space-y-5">
                {FACTS.map((fact) => (
                  <li key={fact.label} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember">
                      <fact.icon className="size-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-ink/45">{fact.label}</span>
                      <span className="block text-sm font-medium text-ink">{fact.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
