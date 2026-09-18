import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Container from './Container'
import { NAV_GROUPS, SITE } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/92 shadow-[0_1px_0_0_rgba(22,20,15,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
              {SITE.initials}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold text-ink">{SITE.name}</span>
              <span className="text-xs text-ink/55">{SITE.party}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenGroup(null)}>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onClick={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
                  aria-expanded={openGroup === group.label}
                >
                  {group.label}
                  <ChevronDown className="size-3.5" strokeWidth={2} />
                </button>
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-150 ${
                    openGroup === group.label ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <div className="w-64 rounded-2xl border border-paper-line bg-paper p-2 shadow-xl shadow-ink/10">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenGroup(null)}
                        className="block rounded-xl px-3 py-2.5 text-sm text-ink/75 transition-colors hover:bg-ember-tint hover:text-ember"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#participa"
              className="hidden items-center rounded-full bg-ember px-4 py-2 text-sm font-semibold text-paper transition-transform active:scale-[0.98] sm:inline-flex"
            >
              Participá
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper lg:hidden">
              <Container>
                <div className="flex h-16 items-center justify-between">
                  <span className="font-display text-sm font-semibold text-ink">{SITE.name}</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex size-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                    aria-label="Cerrar menú"
                  >
                    <X className="size-5" strokeWidth={2} />
                  </button>
                </div>
              </Container>
              <Container className="flex-1 pb-10">
                <div className="flex flex-col gap-8 pt-4">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">{group.label}</p>
                      <div className="mt-3 flex flex-col gap-1">
                        {group.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-2 py-3 font-display text-xl font-medium text-ink"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  <a
                    href="#participa"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-ember px-5 py-3.5 text-sm font-semibold text-paper"
                  >
                    Participá
                  </a>
                </div>
              </Container>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
