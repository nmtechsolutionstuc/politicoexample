import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RevealImage({
  src,
  alt,
  className = '',
  parallax = true,
  direction = 'up',
}: {
  src: string
  alt: string
  className?: string
  parallax?: boolean
  direction?: 'up' | 'down'
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.set(wrap, { clipPath: direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' })

    // IntersectionObserver drives the one-off reveal so it can't get stuck if web fonts or
    // other lazy images shift the page height after ScrollTrigger's first measurement.
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(wrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' })
        revealObserver.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    revealObserver.observe(wrap)

    let scrollTrigger: ScrollTrigger | undefined
    if (parallax) {
      const tween = gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
      scrollTrigger = tween.scrollTrigger
    }

    return () => {
      revealObserver.disconnect()
      scrollTrigger?.kill()
      gsap.killTweensOf([wrap, img])
    }
  }, [parallax, direction])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${parallax ? 'scale-110' : ''}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
    </div>
  )
}
