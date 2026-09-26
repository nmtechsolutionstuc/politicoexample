import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import Container from './Container'
import { NAV_LINKS, SITE } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  // While the header sits over the dark hero it must use light text — dark navy links on the
  // navy hero were invisible. Pages without the hero (e.g. #/transparencia) keep dark text.
  // The initial guess comes from the route (the hero isn't in the DOM yet on first render);
  // starting from `false` made the links flash dark → light on every page load.
  const [overHero, setOverHero] = useState(() => !window.location.hash.startsWith('#/') && window.scrollY < 400)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const hero = document.getElementById('top')
      setOverHero(!!hero && window.scrollY < hero.offsetHeight - 72)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onScroll)
    }
  }, [])

  const headerSurface = overHero
    ? scrolled
      ? 'bg-ink/80 shadow-[0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md'
      : 'bg-transparent'
    : scrolled
      ? 'bg-paper/95 shadow-[0_1px_0_0_rgba(16,27,61,0.08)] backdrop-blur-md'
      : 'bg-transparent'

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerSurface}`}>
      <Container>
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label={`${SITE.name}, ir al inicio`}>
            <span
              className={`flex size-10 items-center justify-center rounded-full font-display text-sm font-semibold transition-colors ${
                overHero ? 'bg-paper text-ink' : 'bg-ink text-paper'
              }`}
            >
              {SITE.initials}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className={`font-display text-sm font-semibold transition-colors ${overHero ? 'text-paper' : 'text-ink'}`}>{SITE.name}</span>
              <span className={`text-xs transition-colors ${overHero ? 'text-paper/70' : 'text-ink/65'}`}>{SITE.party}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  overHero ? 'text-paper/80 hover:bg-paper/10 hover:text-paper' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className={`flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              overHero ? 'text-paper hover:bg-paper/10' : 'text-ink hover:bg-ink/5'
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" strokeWidth={2} />
          </button>
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
                <div className="flex flex-col gap-1 pt-6">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-2 py-3 font-display text-2xl font-medium text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Container>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
