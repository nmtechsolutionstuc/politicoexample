import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface RevealOptions {
  y?: number
  x?: number
  scale?: number
  stagger?: number
  duration?: number
  ease?: string
  /** GSAP ScrollTrigger-style string, e.g. 'top 85%'. Only the percentage is used. */
  start?: string
}

function marginFromStart(start?: string) {
  const match = start?.match(/(\d+)%/)
  const percent = match ? Number(match[1]) : 84
  return `0px 0px -${100 - percent}% 0px`
}

export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const targets = el.hasAttribute('data-reveal-group')
      ? Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
      : [el]

    if (targets.length === 0) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (options?.y !== undefined) fromVars.y = options.y
    else if (options?.x === undefined && options?.scale === undefined) fromVars.y = 28
    if (options?.x !== undefined) fromVars.x = options.x
    if (options?.scale !== undefined) fromVars.scale = options.scale

    gsap.set(targets, fromVars)

    // IntersectionObserver (rather than a pre-computed pixel offset) keeps this correct even
    // when web fonts, lazy images or accordions shift the page height after first paint.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: options?.duration ?? 0.9,
          ease: options?.ease ?? 'power3.out',
          stagger: options?.stagger ?? 0.1,
        })
        observer.disconnect()
      },
      { rootMargin: marginFromStart(options?.start), threshold: 0 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      gsap.killTweensOf(targets)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.y, options?.x, options?.scale, options?.stagger, options?.duration, options?.ease, options?.start])

  return ref
}
