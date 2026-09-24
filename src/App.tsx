import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollProgress from './components/ScrollProgress.tsx'
import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import Stats from './components/Stats.tsx'
import QuienSoy from './components/QuienSoy.tsx'
import Trayectoria from './components/Trayectoria.tsx'
import Propuestas from './components/Propuestas.tsx'
import Participa from './components/Participa.tsx'
import PropuestasComunidad from './components/PropuestasComunidad.tsx'
import AgendaPublica from './components/AgendaPublica.tsx'
import PreguntasRespuestas from './components/PreguntasRespuestas.tsx'
import RedesSociales from './components/RedesSociales.tsx'
import Contacto from './components/Contacto.tsx'
import Footer from './components/Footer.tsx'
import AdminPanel from './components/AdminPanel.tsx'
import TransparenciaPage from './components/TransparenciaPage.tsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isPanel = hash.startsWith('#/panel')
  const isTransparencia = hash.startsWith('#/transparencia')

  useEffect(() => {
    // Web fonts, lazy images and accordions all change the page height after GSAP's
    // first measurement, which leaves ScrollTrigger start/end positions stale. Watching
    // body size directly (rather than guessing which async event is the culprit) keeps
    // every trigger in sync whenever the layout actually settles.
    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    const observer = new ResizeObserver(refresh)
    observer.observe(document.body)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [hash])

  if (isPanel) return <AdminPanel />

  return (
    <div id="top">
      <ScrollProgress />
      <Nav />
      <main>
        {isTransparencia ? (
          <TransparenciaPage />
        ) : (
          <>
            <Hero />
            <Stats />
            <QuienSoy />
            <Trayectoria />
            <Propuestas />
            <Participa />
            <PropuestasComunidad />
            <AgendaPublica />
            <PreguntasRespuestas />
            <RedesSociales />
            <Contacto />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
