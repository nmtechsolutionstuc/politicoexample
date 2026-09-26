const STATUS_STYLES: Record<string, string> = {
  Presentado: 'bg-ink/8 text-ink/70 border-ink/15',
  Recibida: 'bg-ink/8 text-ink/70 border-ink/15',
  'En análisis': 'bg-ember-tint text-ember-deep border-ember/40',
  'En tratamiento': 'bg-ember-tint text-ember-deep border-ember/40',
  Respondida: 'bg-ember-tint text-ember-deep border-ember/40',
  Aprobado: 'bg-forest-soft text-forest border-forest/25',
  Incorporada: 'bg-forest-soft text-forest border-forest/25',
  'Proyecto presentado': 'bg-forest-soft text-forest border-forest/25',
  'En ejecución': 'bg-forest-soft text-forest border-forest/25',
  Finalizado: 'bg-forest-soft text-forest border-forest/25',
}

export default function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? 'bg-ink/8 text-ink/70 border-ink/15'
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  )
}
