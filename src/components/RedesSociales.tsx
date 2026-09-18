import { ArrowUpRight } from 'lucide-react'
import Container from './Container'
import SectionHeading from './SectionHeading'
import SocialIcon from './SocialIcon'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { RECENT_POSTS, SOCIAL_LINKS } from '../data/content'

export default function RedesSociales() {
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 14, stagger: 0.06, start: 'top 85%' })
  const postsRef = useScrollReveal<HTMLDivElement>({ y: 14, stagger: 0.06, start: 'top 88%' })

  return (
    <section id="redes" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Redes sociales"
          description="Todos los canales oficiales de Martín, para no perderte ninguna novedad."
        />

        <div ref={gridRef} data-reveal-group className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              data-reveal
              key={social.platform}
              href={social.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-paper-line bg-white/50 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-lg hover:shadow-ink/5"
            >
              <span className="flex items-center gap-3.5">
                <span className="flex size-10 items-center justify-center rounded-full bg-ember-tint text-ember transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <SocialIcon icon={social.icon} className="size-4.5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{social.platform}</span>
                  <span className="block text-xs text-ink/50">{social.handle}</span>
                </span>
              </span>
              <ArrowUpRight className="size-4 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" strokeWidth={2.25} />
            </a>
          ))}
        </div>

        <div className="mt-14">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink/45">Publicaciones recientes</p>
          <div ref={postsRef} data-reveal-group className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT_POSTS.map((post) => (
              <div
                data-reveal
                key={post.caption}
                className="flex flex-col rounded-2xl border border-paper-line bg-white/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-lg hover:shadow-ink/5"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-ember">{post.platform}</span>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink/75">{post.caption}</p>
                <p className="mt-3 text-xs text-ink/40">{post.date}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
