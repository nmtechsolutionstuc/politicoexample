import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A warm constellation of points standing in for the neighbor network the
// campaign is built on. Purely decorative background for the Hero: it never
// captures pointer events and disconnects itself once the section scrolls
// out of view or the tab is hidden, so it never competes for GPU time with
// the rest of the page.
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isNarrow = window.innerWidth < 768
    const count = isNarrow ? 42 : 78
    const spread = { x: 15, y: 9, z: 6 }
    const maxLinkDistance = 3.1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const group = new THREE.Group()
    scene.add(group)

    // Shared position buffer: points and connecting lines both read from it,
    // so tilting the group moves everything together with zero per-frame cost.
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [new THREE.Color('#f3a98f'), new THREE.Color('#f5b942'), new THREE.Color('#fbe2d8')]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread.x
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z
      const c = palette[i % palette.length]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)

    const linePositions: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < maxLinkDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          )
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#e8472f', transparent: true, opacity: 0.16 })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    group.add(lines)

    let width = 0
    let height = 0
    function resize() {
      if (!wrap) return
      width = wrap.clientWidth
      height = wrap.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }
    resize()

    const pointer = { x: 0, y: 0 }
    function onPointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', resize)

    let frame = 0
    let running = true
    const clock = new THREE.Clock()

    function renderFrame() {
      const t = clock.getElapsedTime()
      group.rotation.y = t * 0.02 + pointer.x * 0.18
      group.rotation.x = pointer.y * -0.1
      renderer.render(scene, camera)
    }

    function loop() {
      if (!running) return
      renderFrame()
      frame = requestAnimationFrame(loop)
    }

    if (reduceMotion) {
      renderFrame()
    } else {
      loop()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) return
        if (entry.isIntersecting && !running) {
          running = true
          loop()
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    function onVisibility() {
      if (reduceMotion) return
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else {
        running = true
        loop()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
