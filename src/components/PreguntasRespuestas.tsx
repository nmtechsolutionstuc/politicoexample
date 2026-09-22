import { useState } from 'react'
import { Plus } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { FAQS } from '../data/content'

export default function PreguntasRespuestas() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useScrollReveal<HTMLDivElement>({ start: 'top 85%' })

  return (
    <section id="preguntas" className="bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading title="Preguntas directas. Respuestas claras." />

        <div ref={ref} className="mt-11 divide-y divide-paper-line border-y border-paper-line">
          {FAQS.map((faq, index) => {
            const open = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-base font-semibold text-ink md:text-lg">{faq.question}</span>
                  <Plus className={`size-5 shrink-0 text-ember transition-transform duration-200 ${open ? 'rotate-45' : ''}`} strokeWidth={2.25} />
                </button>
                <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-[65ch] pb-6 text-sm leading-relaxed text-ink/70 md:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
