import { Mail, MessageCircle } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CONTACT, NAV_LINKS, SITE, SOCIAL_LINKS } from '../data/content'

export default function Footer() {
  const headRef = useScrollReveal<HTMLDivElement>({ y: 16 })
  const rowRef = useScrollReveal<HTMLDivElement>({ y: 16, start: 'top 90%' })

  return (
    <footer className="bg-ink pt-14 text-paper md:pt-16">
      <Container>
        <div ref={headRef} className="border-b border-paper/10 pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-soft">
            {SITE.party} · {SITE.district}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">{SITE.name}</h2>
          <p className="mt-2 text-base text-paper/60 md:text-lg">{SITE.role}</p>
        </div>

        <div ref={rowRef} className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <nav className="flex flex-wrap gap-x-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center text-sm text-paper/70 transition-colors hover:text-ember-soft">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-5">
            <a href={CONTACT.whatsappLink} className="flex min-h-11 items-center gap-2 text-sm text-paper/70 hover:text-ember-soft">
              <MessageCircle className="size-4" strokeWidth={2} /> {CONTACT.whatsapp}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 items-center gap-2 text-sm text-paper/70 hover:text-ember-soft">
              <Mail className="size-4" strokeWidth={2} /> {CONTACT.email}
            </a>
            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="flex size-11 items-center justify-center rounded-full text-paper/70 transition-all hover:-translate-y-0.5 hover:bg-paper/10 hover:text-paper"
                >
                  <SocialIcon icon={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-8 text-xs text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>Todos los datos de este sitio son ficticios. Demo comercial desarrollada por NMTECH Solutions.</p>
          <div className="flex items-center gap-4">
            <a href="#/transparencia" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-paper">
              Transparencia
            </a>
            <a href="#/panel" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-paper">
              Panel de gestión (demo interna)
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
