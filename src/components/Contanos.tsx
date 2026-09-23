import { type FormEvent, useState } from 'react'
import { ImagePlus, Lightbulb, Flag } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { Field, inputClass, SuccessNotice } from './FormField'
import { IDEA_CATEGORIES, REPORT_CATEGORIES } from '../data/content'

type Tab = 'idea' | 'problema'

interface IdeaState {
  title: string
  category: string
  neighborhood: string
  description: string
  solution: string
  contact: string
}

interface ProblemState {
  category: string
  neighborhood: string
  description: string
  contact: string
}

const EMPTY_IDEA: IdeaState = { title: '', category: '', neighborhood: '', description: '', solution: '', contact: '' }
const EMPTY_PROBLEM: ProblemState = { category: '', neighborhood: '', description: '', contact: '' }

export default function Contanos() {
  const [tab, setTab] = useState<Tab>('idea')

  const [idea, setIdea] = useState<IdeaState>(EMPTY_IDEA)
  const [ideaErrors, setIdeaErrors] = useState<Partial<Record<keyof IdeaState, string>>>({})
  const [ideaSubmitted, setIdeaSubmitted] = useState(false)

  const [problem, setProblem] = useState<ProblemState>(EMPTY_PROBLEM)
  const [problemErrors, setProblemErrors] = useState<Partial<Record<keyof ProblemState, string>>>({})
  const [problemSubmitted, setProblemSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  function updateIdea<K extends keyof IdeaState>(key: K, value: IdeaState[K]) {
    setIdea((f) => ({ ...f, [key]: value }))
  }

  function updateProblem<K extends keyof ProblemState>(key: K, value: ProblemState[K]) {
    setProblem((f) => ({ ...f, [key]: value }))
  }

  function submitIdea(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof IdeaState, string>> = {}
    if (!idea.title.trim()) nextErrors.title = 'Contanos el título de tu propuesta.'
    if (!idea.category) nextErrors.category = 'Elegí una categoría.'
    if (!idea.neighborhood.trim()) nextErrors.neighborhood = 'Indicá tu barrio o localidad.'
    if (!idea.description.trim()) nextErrors.description = 'Describí brevemente la propuesta.'
    setIdeaErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setIdeaSubmitted(true)
      setIdea(EMPTY_IDEA)
    }
  }

  function submitProblem(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof ProblemState, string>> = {}
    if (!problem.category) nextErrors.category = 'Elegí una categoría.'
    if (!problem.neighborhood.trim()) nextErrors.neighborhood = 'Indicá tu barrio o localidad.'
    if (!problem.description.trim()) nextErrors.description = 'Contanos qué está pasando.'
    setProblemErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setProblemSubmitted(true)
      setProblem(EMPTY_PROBLEM)
      setFileName(null)
    }
  }

  return (
    <section id="contanos" className="bg-paper py-14 md:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              title="Contanos"
              description="Proponé una idea para tu barrio o avisanos qué está pasando. Elegí una opción."
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
              Podés ver el estado de las propuestas ya enviadas en{' '}
              <a href="#comunidad" className="font-medium text-ember underline underline-offset-2">
                Propuestas de la comunidad
              </a>
              .
            </p>
          </div>

          <div>
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setTab('idea')}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === 'idea' ? 'border-ember bg-ember text-paper' : 'border-paper-line bg-white/50 text-ink/65 hover:border-ember/40'
                }`}
              >
                <Lightbulb className="size-4" strokeWidth={2.25} /> Proponer una idea
              </button>
              <button
                onClick={() => setTab('problema')}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === 'problema' ? 'border-ember bg-ember text-paper' : 'border-paper-line bg-white/50 text-ink/65 hover:border-ember/40'
                }`}
              >
                <Flag className="size-4" strokeWidth={2.25} /> Contar un problema
              </button>
            </div>

            {tab === 'idea' ? (
              ideaSubmitted ? (
                <SuccessNotice
                  title="Recibimos tu propuesta"
                  description="Gracias por participar. Vas a poder ver su estado en Propuestas de la comunidad en los próximos días."
                />
              ) : (
                <form onSubmit={submitIdea} noValidate className="space-y-5 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-8">
                  <Field label="Título de la propuesta" htmlFor="idea-title" required>
                    <input
                      id="idea-title"
                      className={inputClass}
                      value={idea.title}
                      onChange={(e) => updateIdea('title', e.target.value)}
                      placeholder="Ej. Más luminarias en la calle Belgrano"
                    />
                    {ideaErrors.title ? <p className="text-xs text-ember">{ideaErrors.title}</p> : null}
                  </Field>

                  <Field label="Categoría" htmlFor="idea-category" required>
                    <div className="flex flex-wrap gap-2">
                      {IDEA_CATEGORIES.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => updateIdea('category', category)}
                          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            idea.category === category
                              ? 'border-ember bg-ember text-paper'
                              : 'border-paper-line bg-white text-ink/65 hover:border-ember/40'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    {ideaErrors.category ? <p className="text-xs text-ember">{ideaErrors.category}</p> : null}
                  </Field>

                  <Field label="Barrio o localidad" htmlFor="idea-neighborhood" required>
                    <input
                      id="idea-neighborhood"
                      className={inputClass}
                      value={idea.neighborhood}
                      onChange={(e) => updateIdea('neighborhood', e.target.value)}
                      placeholder="Ej. Villa 9 de Julio"
                    />
                    {ideaErrors.neighborhood ? <p className="text-xs text-ember">{ideaErrors.neighborhood}</p> : null}
                  </Field>

                  <Field label="Descripción" htmlFor="idea-description" required>
                    <textarea
                      id="idea-description"
                      className={`${inputClass} min-h-28 resize-y`}
                      value={idea.description}
                      onChange={(e) => updateIdea('description', e.target.value)}
                      placeholder="Contanos con el mayor detalle posible qué situación querés mejorar."
                    />
                    {ideaErrors.description ? <p className="text-xs text-ember">{ideaErrors.description}</p> : null}
                  </Field>

                  <Field label="Posible solución" htmlFor="idea-solution" helper="Si ya pensaste una forma de resolverlo, contanosla.">
                    <textarea
                      id="idea-solution"
                      className={`${inputClass} min-h-24 resize-y`}
                      value={idea.solution}
                      onChange={(e) => updateIdea('solution', e.target.value)}
                      placeholder="Ej. Instalar dos luminarias led en la esquina."
                    />
                  </Field>

                  <Field label="Nombre y contacto" htmlFor="idea-contact" helper="Solo lo usamos para darte novedades de tu propuesta.">
                    <input
                      id="idea-contact"
                      className={inputClass}
                      value={idea.contact}
                      onChange={(e) => updateIdea('contact', e.target.value)}
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
              )
            ) : problemSubmitted ? (
              <SuccessNotice
                title="Recibimos tu reporte"
                description="Gracias por avisarnos. Lo vamos a derivar al área correspondiente y a mantenerlo en seguimiento."
              />
            ) : (
              <form onSubmit={submitProblem} noValidate className="space-y-5 rounded-3xl border border-paper-line bg-white/50 p-6 md:p-8">
                <Field label="Categoría" htmlFor="report-category" required>
                  <div className="flex flex-wrap gap-2">
                    {REPORT_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => updateProblem('category', category)}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          problem.category === category
                            ? 'border-ember bg-ember text-paper'
                            : 'border-paper-line bg-white text-ink/65 hover:border-ember/40'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {problemErrors.category ? <p className="text-xs text-ember">{problemErrors.category}</p> : null}
                </Field>

                <Field label="Barrio o localidad" htmlFor="report-neighborhood" required>
                  <input
                    id="report-neighborhood"
                    className={inputClass}
                    value={problem.neighborhood}
                    onChange={(e) => updateProblem('neighborhood', e.target.value)}
                    placeholder="Ej. Barrio Norte"
                  />
                  {problemErrors.neighborhood ? <p className="text-xs text-ember">{problemErrors.neighborhood}</p> : null}
                </Field>

                <Field label="Descripción del problema" htmlFor="report-description" required>
                  <textarea
                    id="report-description"
                    className={`${inputClass} min-h-28 resize-y`}
                    value={problem.description}
                    onChange={(e) => updateProblem('description', e.target.value)}
                    placeholder="Contanos qué pasa y, si podés, en qué calle o esquina exacta."
                  />
                  {problemErrors.description ? <p className="text-xs text-ember">{problemErrors.description}</p> : null}
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
                    value={problem.contact}
                    onChange={(e) => updateProblem('contact', e.target.value)}
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
