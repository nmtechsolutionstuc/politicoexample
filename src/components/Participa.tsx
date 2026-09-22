import { Lightbulb, Flag, HelpCircle, CalendarCheck, Users, Handshake, ArrowUpRight } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PARTICIPATION_OPTIONS, SITE, type ParticipationOption } from '../data/content'
import participaPhoto from '../assets/images/politico-3.webp'

const ICONS: Record<ParticipationOption['icon'], typeof Lightbulb> = {
  lightbulb: Lightbulb,
  flag: Flag,
  'message-circle-question': HelpCircle,
  'calendar-check': CalendarCheck,
  users: Users,
  handshake: Handshake,
}

export default function Participa() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 18, stagger: 0.07, start: 'top 85%' })
  const [featured, ...rest] = PARTICIPATION_OPTIONS

  return (
    <section id="participa" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Una plataforma abierta"
          title="Tu voz también cuenta"
          description="Elegí qué querés hacer. Cada opción abre su propio formulario o te lleva directo a la sección correspondiente."
        />

        <div ref={ref} data-reveal-group className="mt-11 grid gap-4 md:grid-cols-3">
          <OptionCard option={featured} Icon={ICONS[featured.icon]} large />
          {rest.map((option) => (
            <OptionCard key={option.title} option={option} Icon={ICONS[option.icon]} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function OptionCard({ option, Icon, large }: { option: ParticipationOption; Icon: typeof Lightbulb; large?: boolean }) {
  if (large) {
    return (
      <a
        data-reveal
        href={option.target}
        className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 md:col-span-2 md:p-9"
      >
        <img
          src={participaPhoto}
          alt={`${SITE.name} escuchando propuestas de vecinos en una reunión comunitaria`}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="relative">
          <span className="flex size-11 items-center justify-center rounded-full bg-ember text-paper">
            <Icon className="size-5" strokeWidth={2} />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-paper md:text-3xl">{option.title}</h3>
          <p className="mt-2 max-w-md text-base text-paper/75">{option.description}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-soft">
            Empezar
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.25} />
          </span>
        </div>
      </a>
    )
  }

  return (
    <a
      data-reveal
      href={option.target}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-paper-line bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-lg hover:shadow-ink/5"
    >
      <div>
        <span className="flex size-11 items-center justify-center rounded-full bg-ember-tint text-ember transition-colors group-hover:bg-ember group-hover:text-paper">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-display text-lg font-semibold text-ink">{option.title}</h3>
        <p className="mt-2 text-sm text-ink/65">{option.description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ember">
        Empezar
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.25} />
      </span>
    </a>
  )
}
