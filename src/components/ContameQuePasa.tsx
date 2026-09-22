import { type FormEvent, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { Field, inputClass, SuccessNotice } from './FormField'
import { REPORT_CATEGORIES } from '../data/content'

interface FormState {
  category: string
  neighborhood: string
  description: string
  contact: string
}

const EMPTY: FormState = { category: '', neighborhood: '', description: '', contact: '' }

export default function ContameQuePasa() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [fileName, setFileName] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.category) nextErrors.category = 'Elegí una categoría.'
    if (!form.neighborhood.trim()) nextErrors.neighborhood = 'Indicá tu barrio o localidad.'
    if (!form.description.trim()) nextErrors.description = 'Contanos qué está pasando.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm(EMPTY)
      setFileName(null)
    }
  }

  return (
    <section id="contame" className="bg-paper py-14 md:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              title="Contame qué pasa en tu barrio"
              description="Avisanos sobre calles, alumbrado, transporte, limpieza o cualquier otra situación puntual."
            />
          </div>

          <div>
            {submitted ? (
              <SuccessNotice
                title="Recibimos tu reporte"
                description="Gracias por avisarnos. Lo vamos a derivar al área correspondiente y a mantenerlo en seguimiento."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-8">
                <Field label="Categoría" htmlFor="report-category" required>
                  <div className="flex flex-wrap gap-2">
                    {REPORT_CATEGORIES.map((category) => (
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

                <Field label="Barrio o localidad" htmlFor="report-neighborhood" required>
                  <input
                    id="report-neighborhood"
                    className={inputClass}
                    value={form.neighborhood}
                    onChange={(e) => update('neighborhood', e.target.value)}
                    placeholder="Ej. Barrio Norte"
                  />
                  {errors.neighborhood ? <p className="text-xs text-ember">{errors.neighborhood}</p> : null}
                </Field>

                <Field label="Descripción del problema" htmlFor="report-description" required>
                  <textarea
                    id="report-description"
                    className={`${inputClass} min-h-28 resize-y`}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Contanos qué pasa y, si podés, en qué calle o esquina exacta."
                  />
                  {errors.description ? <p className="text-xs text-ember">{errors.description}</p> : null}
                </Field>

                <Field label="Foto del problema" htmlFor="report-image" helper="Una imagen ayuda a entender la situación más rápido.">
                  <label
                    htmlFor="report-image"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-paper-line bg-white px-4 py-3.5 text-sm text-ink/55 transition-colors hover:border-ember/40"
                  >
                    <ImagePlus className="size-4 shrink-0" strokeWidth={2} />
                    {fileName ?? 'Adjuntar una imagen'}
                  </label>
                  <input
                    id="report-image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </Field>

                <Field label="Nombre y contacto" htmlFor="report-contact" helper="Para avisarte cuando haya una novedad.">
                  <input
                    id="report-contact"
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
                  Enviar reporte
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
