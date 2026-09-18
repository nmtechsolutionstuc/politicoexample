import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useCountUp(target: number, format: (n: number) => string, delay = 0) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      el.textContent = format(target)
      return
    }

    const counter = { value: 0 }
    let tween: gsap.core.Tween | null = null

    // IntersectionObserver (instead of a pre-computed ScrollTrigger offset) stays correct
    // even if fonts or images above this element shift the page height after first paint.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        tween = gsap.to(counter, {
          value: target,
          duration: 1.2,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(Math.round(counter.value))
          },
        })
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      tween?.kill()
    }
  }, [target, format, delay])

  return ref
}
