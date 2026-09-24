import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Flag, Heart, Lightbulb, MessageCircleQuestion, Users } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import StatusPill from './StatusPill'
import { Field, SuccessNotice, inputClass } from './FormField'
import { COMMUNITY_PROPOSALS, PARTICIPATE_FLOWS, type ParticipateFlow } from '../data/content'

const FLOW_ICONS = { lightbulb: Lightbulb, flag: Flag, 'message-circle-question': MessageCircleQuestion, users: Users }

function FlowForm({ flow, onDone }: { flow: ParticipateFlow; onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const step = flow.steps[stepIndex]
  const isLast = stepIndex === flow.steps.length - 1
  const canAdvance = step.optional || Boolean(values[step.key]?.trim())

  const setValue = (value: string) => setValues((v) => ({ ...v, [step.key]: value }))

  if (submitted) {
    return (
      <SuccessNotice
        title="¡Gracias, ya lo recibimos!"
        description="El equipo territorial lo revisa y, si dejaste un contacto, te respondemos a la brevedad."
      />
    )
  }

  return (
    <div className="rounded-3xl border border-paper-line bg-white p-6 md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
          Paso {stepIndex + 1} de {flow.steps.length}
        </p>
        <button onClick={onDone} className="text-xs font-semibold text-ink/40 hover:text-ink">
          Cancelar
        </button>
      </div>

      <div className="mt-3 flex gap-1.5">
        {flow.steps.map((s, i) => (
          <span key={s.key} className={`h-1 flex-1 rounded-full ${i <= stepIndex ? 'bg-ember' : 'bg-paper-line'}`} />
        ))}
      </div>

      <div className="mt-6">
        <Field label={step.label} htmlFor={step.key} required={!step.optional}>
          {step.type === 'pills' ? (
            <div className="flex flex-wrap gap-2">
              {step.options?.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    values[step.key] === option
                      ? 'border-ink bg-ink text-paper'
                      : 'border-paper-line text-ink/70 hover:border-ink/30'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : step.type === 'textarea' ? (
            <textarea
              id={step.key}
              rows={4}
              value={values[step.key] ?? ''}
              onChange={(e) => setValue(e.target.value)}
              placeholder={step.placeholder}
              className={inputClass}
            />
          ) : (
            <input
              id={step.key}
              type="text"
              value={values[step.key] ?? ''}
              onChange={(e) => setValue(e.target.value)}
              placeholder={step.placeholder}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          disabled={stepIndex === 0}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink disabled:opacity-0"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} />
          Atrás
        </button>

        <button
          onClick={() => (isLast ? setSubmitted(true) : setStepIndex((i) => i + 1))}
          disabled={!canAdvance}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity disabled:opacity-30"
        >
          {isLast ? 'Enviar' : 'Siguiente'}
          {isLast ? <Check className="size-4" strokeWidth={2.5} /> : <ArrowRight className="size-4" strokeWidth={2.25} />}
        </button>
      </div>
    </div>
  )
}

function CommunityCard({ proposal }: { proposal: (typeof COMMUNITY_PROPOSALS)[number] }) {
  const [supports, setSupports] = useState(proposal.supports)
  const [supported, setSupported] = useState(false)

  return (
    <div className="flex flex-col rounded-2xl border border-paper-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">{proposal.category}</span>
        <StatusPill status={proposal.status} />
      </div>
      <h4 className="mt-2 font-display text-base font-semibold text-ink">{proposal.title}</h4>
      <p className="mt-1 text-sm text-ink/60">{proposal.neighborhood}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{proposal.description}</p>
      <button
        onClick={() => {
          if (supported) return
          setSupported(true)
          setSupports((s) => s + 1)
        }}
        className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
          supported ? 'border-ember/40 bg-ember-tint text-ember' : 'border-paper-line text-ink/60 hover:border-ink/30'
        }`}
      >
        <Heart className="size-3.5" strokeWidth={2.25} fill={supported ? 'currentColor' : 'none'} />
        {supports} {supported ? 'apoyaron, vos también' : 'apoyos en la plataforma'}
      </button>
    </div>
  )
}

export default function Participa() {
  const [activeFlow, setActiveFlow] = useState<ParticipateFlow | null>(null)
  const [showAllCommunity, setShowAllCommunity] = useState(false)
  const visibleProposals = showAllCommunity ? COMMUNITY_PROPOSALS : COMMUNITY_PROPOSALS.slice(0, 3)

  return (
    <section id="participa" className="bg-paper-dim py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="03 · PARTICIPÁ" title="Tu voz también cuenta" />

        <div className="mt-10">
          {activeFlow ? (
            <div className="mx-auto max-w-xl">
              <FlowForm flow={activeFlow} onDone={() => setActiveFlow(null)} />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTICIPATE_FLOWS.map((flow) => {
                const Icon = FLOW_ICONS[flow.icon]
                return (
                  <button
                    key={flow.key}
                    onClick={() => setActiveFlow(flow)}
                    className="flex flex-col items-start rounded-2xl border border-paper-line bg-white p-5 text-left transition-colors hover:border-ink/25"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-ember-tint text-ember">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <h4 className="mt-3 font-display text-base font-semibold text-ink">{flow.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{flow.description}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">Ideas de la comunidad</h3>
            <button
              onClick={() => setShowAllCommunity((v) => !v)}
              className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
            >
              {showAllCommunity ? 'Ver menos' : 'Ver todas'}
            </button>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProposals.map((proposal) => (
              <CommunityCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
