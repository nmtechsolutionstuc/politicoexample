import { type FormEvent, useState } from 'react'
import { ChevronDown, Mail, MessageCircle } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { Field, inputClass, SuccessNotice } from './FormField'
import { CONTACT, CONTACT_REASONS, FAQS, RECENT_POSTS, SITE, SOCIAL_LINKS } from '../data/content'
import introPhoto from '../assets/images/politico-2.webp'
import closingPhoto from '../assets/images/politico-4.webp'

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
    <div className="divide-y divide-paper-line">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-medium text-ink">{faq.question}</span>
              <ChevronDown className={`size-4 shrink-0 text-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={2.25} />
            </button>
            {isOpen ? <p className="pb-4 text-sm leading-relaxed text-ink/60">{faq.answer}</p> : null}
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
    <>
      <section id="contacto" className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:h-full lg:min-h-80">
                <img src={introPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/70">05 · CONTACTO</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.1] text-paper md:text-4xl">¿Conversamos?</h2>
                  <p className="mt-2 font-script text-2xl text-paper/90">Estoy para escucharte.</p>
                </div>
              </div>

              <div>
                <a href={CONTACT.whatsappLink} className="flex items-center gap-2.5 text-sm font-medium text-ink hover:text-ember">
                  <MessageCircle className="size-4" strokeWidth={2} /> {CONTACT.whatsapp}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="mt-2.5 flex items-center gap-2.5 text-sm font-medium text-ink hover:text-ember">
                  <Mail className="size-4" strokeWidth={2} /> {CONTACT.email}
                </a>
                <p className="mt-2.5 text-xs text-ink/45">{CONTACT.address}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Redes</p>
                <div className="mt-3 flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <div key={social.platform} className="group relative">
                      <a
                        href={social.href}
                        aria-label={social.platform}
                        className="flex size-9 items-center justify-center rounded-full border border-paper-line text-ink/50 transition-all hover:-translate-y-0.5 hover:scale-110 hover:border-ember/30 hover:bg-ember-tint hover:text-ember"
                      >
                        <SocialIcon icon={social.icon} className="size-4" />
                      </a>
                      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                        {social.platform}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2.5">
                  {RECENT_POSTS.slice(0, 2).map((post) => (
                    <div key={post.caption} className="border-t border-paper-line pt-2.5">
                      <p className="text-xs font-semibold text-ink/50">
                        {post.platform} · {post.date}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink/70">{post.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <p className="text-sm font-semibold text-ink">¿Sobre qué querés escribir?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CONTACT_REASONS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => selectReason(item.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        reason === item.key ? 'border-ink bg-ink text-paper' : 'border-paper-line text-ink/70 hover:border-ink/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  {submitted ? (
                    <SuccessNotice title="Mensaje enviado" description="Gracias por escribirnos. Te vamos a responder a la brevedad." />
                  ) : (
                    <form key={reason} onSubmit={handleSubmit} className="animate-fade-in space-y-5">
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
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Preguntas frecuentes</h3>
                <div className="mt-2">
                  <FaqAccordion />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 md:py-32">
        <img src={closingPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
        <Container className="relative text-center">
          <p className="font-script text-3xl text-ember-soft md:text-4xl">Una ciudad mejor se construye escuchando.</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-paper md:text-3xl">
            {SITE.name} · {SITE.role}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#participa" className="inline-flex items-center rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink">
              Participá
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold text-paper hover:bg-paper/10"
            >
              Contactame
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
