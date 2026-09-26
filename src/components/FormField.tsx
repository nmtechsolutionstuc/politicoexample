import type { ReactNode } from 'react'

export const inputClass =
  'w-full rounded-xl border border-paper-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/55 outline-none transition-colors focus:border-ember focus:ring-2 focus:ring-ember/20'

export function Field({
  label,
  htmlFor,
  helper,
  required,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-ember-deep">*</span> : <span className="ml-1 text-ink/65">(opcional)</span>}
      </label>
      {children}
      {helper ? <p className="text-xs text-ink/65">{helper}</p> : null}
    </div>
  )
}

export function SuccessNotice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-forest/25 bg-forest-soft/50 p-8 text-center md:p-10">
      <p className="font-display text-xl font-semibold text-forest md:text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-forest/80 md:text-base">{description}</p>
    </div>
  )
}
