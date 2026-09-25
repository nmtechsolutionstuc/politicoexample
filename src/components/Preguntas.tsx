import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { CONTACT, FAQS, SITE } from '../data/content'
import closingPhoto from '../assets/images/politico-4.webp'

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-paper-line border-y border-paper-line">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-ink md:text-lg">{faq.question}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.25}
              />
            </button>
            {isOpen ? <p className="animate-fade-in pb-5 text-sm leading-relaxed text-ink/65 md:text-base">{faq.answer}</p> : null}
          </div>
        )
      })}
    </div>
  )
}

export default function Preguntas() {
  return (
    <>
      <section id="preguntas" className="bg-paper-dim py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="05 · PREGUNTAS"
              title="Preguntas frecuentes"
              description="Lo que más nos consultan sobre cómo participar y seguir las propuestas."
            />
            <FaqAccordion />
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
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold text-paper hover:bg-paper/10"
            >
              Escribime por WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
