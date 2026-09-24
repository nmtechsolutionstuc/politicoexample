import { type FormEvent, useState } from 'react'
import { ChevronDown, Mail, MessageCircle } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import SocialIcon from './SocialIcon'
import { Field, inputClass, SuccessNotice } from './FormField'
import { CONTACT, CONTACT_REASONS, FAQS, RECENT_POSTS, SOCIAL_LINKS } from '../data/content'

type ExtraField = { key: string; label: string; type: 'text' | 'textarea'; placeholder?: string }

const EXTRA_FIELDS: Record<string, ExtraField[]> = {
  propuesta: [
    { key: 'neighborhood', label: 'Barrio o localidad', type: 'text', placeholder: 'Ej. Villa 9 de Julio' },
    { key: 'message', label: 'Tu propuesta', type: 'textarea', placeholder: 'Contanos con el mayor detalle posible.' },
  ],
  problema: [
    { key: 'neighborhood', label: 'Barrio o localidad', type: 'text', placeholder: 'Ej. Barrio Norte' },
    { key: 'message', label: 'Contanos qué está pasando', type: 'textarea', placeholder: 'Si podés, la calle o esquina exacta.' },
  ],
  consulta: [{ key: 'message', label: 'Tu consulta', type: 'textarea', placeholder: 'Contanos tu duda.' }],
  reunion: [
    { key: 'motive', label: 'Motivo de la reunión', type: 'text', placeholder: 'Ej. Proyecto de espacios verdes' },
    { key: 'availability', label: 'Disponibilidad horaria', type: 'text', placeholder: 'Ej. Martes o jueves por la tarde' },
  ],
  prensa: [
    { key: 'outlet', label: 'Medio de comunicación', type: 'text' },
    { key: 'message', label: 'Detalle de la consulta', type: 'textarea' },
  ],
  participar: [
    { key: 'message', label: '¿Cómo te gustaría colaborar?', type: 'textarea', placeholder: 'Difusión, territorio, contenido, logística...' },
  ],
  otro: [{ key: 'message', label: 'Contanos el motivo', type: 'textarea' }],
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-paper-line rounded-2xl border border-paper-line bg-white/50">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-ink">{faq.question}</span>
              <ChevronDown className={`size-4 shrink-0 text-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={2.25} />
            </button>
            {isOpen ? <p className="px-5 pb-4 text-sm leading-relaxed text-ink/60">{faq.answer}</p> : null}
          </div>
        )
      })}
    </div>
  )
}

export default function Contacto() {
  const [reason, setReason] = useState(CONTACT_REASONS[1].key)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const extras = EXTRA_FIELDS[reason] ?? []

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
  }

  function selectReason(key: string) {
    setReason(key)
    setSubmitted(false)
    setFields({})
  }

  return (
    <section id="contacto" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="05 · CONTACTO" title="¿Conversamos?" description="Decinos primero el motivo de tu mensaje para llevarte al lugar correcto." />

        <div className="mt-11 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="space-y-8">
            <div className="flex flex-col gap-1.5">
              {CONTACT_REASONS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => selectReason(item.key)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                    reason === item.key ? 'border-ember bg-ember-tint/50 text-ember' : 'border-paper-line bg-white/50 text-ink/70 hover:border-ember/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-paper-line bg-white/50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Contacto directo</p>
              <a href={CONTACT.whatsappLink} className="mt-3 flex items-center gap-2.5 text-sm font-medium text-ink hover:text-ember">
                <MessageCircle className="size-4" strokeWidth={2} /> {CONTACT.whatsapp}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="mt-2.5 flex items-center gap-2.5 text-sm font-medium text-ink hover:text-ember">
                <Mail className="size-4" strokeWidth={2} /> {CONTACT.email}
              </a>
              <p className="mt-3 text-xs text-ink/45">{CONTACT.address}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Redes</p>
              <div className="mt-3 flex items-center gap-1.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.platform}
                    className="group flex size-9 items-center justify-center rounded-full border border-paper-line text-ink/50 transition-all hover:-translate-y-0.5 hover:border-ember/30 hover:bg-ember-tint hover:text-ember"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-2.5">
                {RECENT_POSTS.slice(0, 2).map((post) => (
                  <div key={post.caption} className="rounded-xl bg-paper-dim p-3.5">
                    <p className="text-xs font-semibold text-ink/50">
                      {post.platform} · {post.date}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/70">{post.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {submitted ? (
              <SuccessNotice title="Mensaje enviado" description="Gracias por escribirnos. Te vamos a responder a la brevedad." />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-8">
                <Field label="Nombre" htmlFor="contact-name" required>
                  <input id="contact-name" required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                {extras.map((field) => (
                  <Field key={field.key} label={field.label} htmlFor={`contact-${field.key}`} required>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={`contact-${field.key}`}
                        required
                        className={`${inputClass} min-h-28 resize-y`}
                        placeholder={field.placeholder}
                        value={fields[field.key] ?? ''}
                        onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        id={`contact-${field.key}`}
                        required
                        className={inputClass}
                        placeholder={field.placeholder}
                        value={fields[field.key] ?? ''}
                        onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))}
                      />
                    )}
                  </Field>
                ))}

                <Field label="Email o WhatsApp" htmlFor="contact-contact" required>
                  <input id="contact-contact" required className={inputClass} value={contact} onChange={(e) => setContact(e.target.value)} />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform active:scale-[0.98] sm:w-auto"
                >
                  Enviar mensaje
                </button>
              </form>
            )}

            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Preguntas frecuentes</h3>
              <div className="mt-4">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
