import { Mail, MessageCircle } from 'lucide-react'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CONTACT, NAV_GROUPS, SITE, SOCIAL_LINKS } from '../data/content'

export default function Footer() {
  const headRef = useScrollReveal<HTMLDivElement>({ y: 16 })
  const colsRef = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.06, start: 'top 90%' })

  return (
    <footer className="bg-ink pt-14 text-paper md:pt-16">
      <Container>
        <div ref={headRef} className="flex flex-col gap-6 border-b border-paper/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-soft">
              {SITE.party} · {SITE.district}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">{SITE.name}</h2>
            <p className="mt-2 text-base text-paper/60 md:text-lg">{SITE.role}</p>
          </div>
          <a
            href="#participa"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Participá
          </a>
        </div>

        <div ref={colsRef} data-reveal-group className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          {NAV_GROUPS.map((group) => (
            <div data-reveal key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-paper/40">{group.label}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-paper/70 transition-colors hover:text-ember-soft">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-paper/40">Contacto</p>
            <div className="mt-4 space-y-2.5">
              <a href={CONTACT.whatsappLink} className="flex items-center gap-2 text-sm text-paper/70 hover:text-ember-soft">
                <MessageCircle className="size-4" strokeWidth={2} /> {CONTACT.whatsapp}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-paper/70 hover:text-ember-soft">
                <Mail className="size-4" strokeWidth={2} /> {CONTACT.email}
              </a>
            </div>
            <div className="mt-5 flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="flex size-8 items-center justify-center rounded-full text-paper/55 transition-all hover:-translate-y-0.5 hover:bg-paper/10 hover:text-paper"
                >
                  <SocialIcon icon={social.icon} className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-8 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>Todos los datos de este sitio son ficticios. Demo comercial desarrollada por NMTECH Solutions.</p>
          <a href="#/panel" className="underline underline-offset-2 hover:text-paper/70">
            Panel de gestión (demo interna)
          </a>
        </div>
      </Container>
    </footer>
  )
}
