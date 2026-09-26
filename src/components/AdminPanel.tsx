import {
  ArrowLeft,
  Lightbulb,
  Milestone,
  CalendarDays,
  HelpCircle,
  Newspaper,
  FileText,
  MessageCircle,
  Flag,
  CalendarCheck,
  Handshake,
} from 'lucide-react'
import Container from './Container'
import { useCountUp } from '../hooks/useCountUp'
import {
  ADMIN_SUMMARY,
  AGENDA_EVENTS,
  COMMUNITY_PROPOSALS,
  FAQS,
  PRESS_ITEMS,
  SITE,
  TRAJECTORY,
  TRANSPARENCY_DOCS,
} from '../data/content'

const STATS = [
  { label: 'Propuestas recibidas', value: ADMIN_SUMMARY.ideasReceived },
  { label: 'Consultas', value: ADMIN_SUMMARY.inquiries },
  { label: 'Solicitudes de reunión', value: ADMIN_SUMMARY.meetingRequests },
  { label: 'Participaciones totales', value: ADMIN_SUMMARY.totalParticipations },
]

const MANAGEMENT_SECTIONS = [
  { icon: Lightbulb, label: 'Propuestas ciudadanas', count: COMMUNITY_PROPOSALS.length },
  { icon: Milestone, label: 'Proyectos y trayectoria', count: TRAJECTORY.length },
  { icon: CalendarDays, label: 'Agenda y eventos', count: AGENDA_EVENTS.length },
  { icon: HelpCircle, label: 'Preguntas frecuentes', count: FAQS.length },
  { icon: Newspaper, label: 'Notas de prensa', count: PRESS_ITEMS.length },
  { icon: FileText, label: 'Documentos de transparencia', count: TRANSPARENCY_DOCS.length },
  { icon: MessageCircle, label: 'Consultas de vecinos', count: ADMIN_SUMMARY.inquiries },
  { icon: Flag, label: 'Reportes de barrio', count: 37 },
  { icon: CalendarCheck, label: 'Solicitudes de reunión', count: ADMIN_SUMMARY.meetingRequests },
  { icon: Handshake, label: 'Personas interesadas en colaborar', count: 52 },
] as const

function StatCard({ label, value }: { label: string; value: number }) {
  const ref = useCountUp(value, (n) => n.toLocaleString('es-AR'))
  return (
    <div className="rounded-2xl border border-paper-line bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/65">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">
        <span ref={ref}>0</span>
      </p>
    </div>
  )
}

export default function AdminPanel() {
  const maxTopic = Math.max(...ADMIN_SUMMARY.topTopics.map((t) => t.count))

  return (
    <div className="min-h-dvh bg-paper-dim/40">
      <header className="border-b border-paper-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ember-deep">
            <ArrowLeft className="size-4" strokeWidth={2.25} />
            Volver al sitio público
          </a>
          <p className="text-sm font-semibold text-ink/65">Panel de gestión · demo interna</p>
        </Container>
      </header>

      <Container className="py-10 md:py-14">
        <div className="mb-10">
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Hola, equipo de {SITE.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink/65 md:text-base">
            Resumen general de la actividad de la plataforma y accesos rápidos a cada área para administrar. Esta vista es una
            demostración conceptual con datos ficticios.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl border border-paper-line bg-white p-6">
            <p className="text-sm font-semibold text-ink">Temas más mencionados</p>
            <div className="mt-5 space-y-4">
              {ADMIN_SUMMARY.topTopics.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/70">{topic.topic}</span>
                    <span className="font-semibold text-ink">{topic.count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-paper-dim">
                    <div className="h-full rounded-full bg-ember" style={{ width: `${(topic.count / maxTopic) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-6">
            <p className="text-sm font-semibold text-ink">Actividad reciente</p>
            <ul className="mt-5 space-y-4">
              {ADMIN_SUMMARY.recentActivity.map((activity) => (
                <li key={activity.detail} className="flex items-start justify-between gap-4 border-b border-paper-line pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{activity.label}</p>
                    <p className="text-sm text-ink/65">{activity.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink/65">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm font-semibold text-ink">Administrar contenido del sitio</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MANAGEMENT_SECTIONS.map((section) => (
              <button
                key={section.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-paper-line bg-white p-5 text-left transition-colors hover:border-ember/40"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ember-tint text-ember-deep">
                    <section.icon className="size-4.5" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-ink">{section.label}</span>
                </span>
                <span className="rounded-full bg-ink/8 px-2.5 py-1 text-xs font-semibold text-ink/65">{section.count}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
