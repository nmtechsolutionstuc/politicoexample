import { MessageCircle, Music2, AtSign } from 'lucide-react'
import type { SocialLink } from '../data/content'

// lucide-react removed brand/logo glyphs from its set. These three follow the
// library's own outline style (currentColor, 1.75 stroke, 24x24 viewBox) so they
// sit visually consistent next to the rest of the icon set.
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.4l-.4 3H11.5v7" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  )
}

function YoutubeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7v4.6l4-2.3z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function SocialIcon({ icon, className }: { icon: SocialLink['icon']; className?: string }) {
  switch (icon) {
    case 'instagram':
      return <InstagramGlyph className={className} />
    case 'facebook':
      return <FacebookGlyph className={className} />
    case 'youtube':
      return <YoutubeGlyph className={className} />
    case 'whatsapp':
      return <MessageCircle className={className} strokeWidth={1.75} />
    case 'tiktok':
      return <Music2 className={className} strokeWidth={1.75} />
    case 'x':
      return <AtSign className={className} strokeWidth={1.75} />
    default:
      return null
  }
}
