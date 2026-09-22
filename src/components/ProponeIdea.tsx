import { type FormEvent, useState } from 'react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { Field, inputClass, SuccessNotice } from './FormField'
import { IDEA_CATEGORIES } from '../data/content'

interface FormState {
  title: string
  category: string
  neighborhood: string
  description: string
  solution: string
  contact: string
}

const EMPTY: FormState = { title: '', category: '', neighborhood: '', description: '', solution: '', contact: '' }

export default function ProponeIdea() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.title.trim()) nextErrors.title = 'Contanos el título de tu propuesta.'
    if (!form.category) nextErrors.category = 'Elegí una categoría.'
    if (!form.neighborhood.trim()) nextErrors.neighborhood = 'Indicá tu barrio o localidad.'
    if (!form.description.trim()) nextErrors.description = 'Describí brevemente la propuesta.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm(EMPTY)
    }
  }

  return (
    <section id="propone-idea" className="bg-paper py-14 md:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              title="Proponé una idea"
              description="Contanos tu propuesta para el barrio o para la ciudad. La revisamos y le damos seguimiento público."
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
              Podés ver el estado de propuestas ya enviadas por otros vecinos en la sección{' '}
              <a href="#comunidad" className="font-medium text-ember underline underline-offset-2">
                Propuestas de la comunidad
              </a>
              .
            </p>
          </div>

          <div>
            {submitted ? (
              <SuccessNotice
                title="Recibimos tu propuesta"
                description="Gracias por participar. Vas a poder ver su estado en la sección de propuestas de la comunidad en los próximos días."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-8">
                <Field label="Título de la propuesta" htmlFor="idea-title" required>
                  <input
                    id="idea-title"
                    className={inputClass}
                    value={form.title}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="Ej. Más luminarias en la calle Belgrano"
                  />
                  {errors.title ? <p className="text-xs text-ember">{errors.title}</p> : null}
                </Field>

                <Field label="Categoría" htmlFor="idea-category" required>
                  <div className="flex flex-wrap gap-2">
                    {IDEA_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => update('category', category)}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          form.category === category
                            ? 'border-ember bg-ember text-paper'
                            : 'border-paper-line bg-white text-ink/65 hover:border-ember/40'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {errors.category ? <p className="text-xs text-ember">{errors.category}</p> : null}
                </Field>

                <Field label="Barrio o localidad" htmlFor="idea-neighborhood" required>
                  <input
                    id="idea-neighborhood"
                    className={inputClass}
                    value={form.neighborhood}
                    onChange={(e) => update('neighborhood', e.target.value)}
                    placeholder="Ej. Villa 9 de Julio"
                  />
                  {errors.neighborhood ? <p className="text-xs text-ember">{errors.neighborhood}</p> : null}
                </Field>

                <Field label="Descripción" htmlFor="idea-description" required>
                  <textarea
                    id="idea-description"
                    className={`${inputClass} min-h-28 resize-y`}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Contanos con el mayor detalle posible qué situación querés mejorar."
                  />
                  {errors.description ? <p className="text-xs text-ember">{errors.description}</p> : null}
                </Field>

                <Field label="Posible solución" htmlFor="idea-solution" helper="Si ya pensaste una forma de resolverlo, contanosla.">
                  <textarea
                    id="idea-solution"
                    className={`${inputClass} min-h-24 resize-y`}
                    value={form.solution}
                    onChange={(e) => update('solution', e.target.value)}
                    placeholder="Ej. Instalar dos luminarias led en la esquina."
                  />
                </Field>

                <Field label="Nombre y contacto" htmlFor="idea-contact" helper="Solo lo usamos para darte novedades de tu propuesta.">
                  <input
                    id="idea-contact"
                    className={inputClass}
                    value={form.contact}
                    onChange={(e) => update('contact', e.target.value)}
                    placeholder="Nombre, email o WhatsApp"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-paper transition-transform active:scale-[0.98] sm:w-auto"
                >
                  Enviar propuesta
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
