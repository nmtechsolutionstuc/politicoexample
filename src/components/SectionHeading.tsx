import { useScrollReveal } from '../hooks/useScrollReveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}) {
  const ref = useScrollReveal<HTMLDivElement>()
  const titleColor = tone === 'dark' ? 'text-paper' : 'text-ink'
  const descColor = tone === 'dark' ? 'text-paper/70' : 'text-ink/65'
  const eyebrowColor = tone === 'dark' ? 'text-ember-soft' : 'text-ember'

  return (
    <div ref={ref} className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem] ${titleColor}`}>
        {title}
      </h2>
      {description ? <p className={`mt-4 text-base leading-relaxed md:text-lg ${descColor}`}>{description}</p> : null}
    </div>
  )
}
