export default function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items]

  return (
    <div aria-hidden className="relative overflow-hidden border-t border-paper/10 py-4">
      <div className="flex w-max animate-marquee gap-8">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8">
            {track.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center gap-8 font-display text-sm font-semibold uppercase tracking-[0.14em] text-paper/45">
                {item}
                <span className="text-ember">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
