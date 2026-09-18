import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress, duration: reduceMotion ? 0 : 0.1 })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div ref={barRef} className="h-full w-full origin-left bg-ember" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
