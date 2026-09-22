import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollProgress from './components/ScrollProgress.tsx'
import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import Stats from './components/Stats.tsx'
import QuienSoy from './components/QuienSoy.tsx'
import PorQueMeInvolucre from './components/PorQueMeInvolucre.tsx'
import Candidatura from './components/Candidatura.tsx'
import Trayectoria from './components/Trayectoria.tsx'
import Propuestas from './components/Propuestas.tsx'
import Prioridades from './components/Prioridades.tsx'
import VisionMisionValores from './components/VisionMisionValores.tsx'
import Participa from './components/Participa.tsx'
import ProponeIdea from './components/ProponeIdea.tsx'
import PropuestasComunidad from './components/PropuestasComunidad.tsx'
import Seguimiento from './components/Seguimiento.tsx'
import ContameQuePasa from './components/ContameQuePasa.tsx'
import MapaParticipacion from './components/MapaParticipacion.tsx'
import AgendaPublica from './components/AgendaPublica.tsx'
import PreguntasRespuestas from './components/PreguntasRespuestas.tsx'
import RedesSociales from './components/RedesSociales.tsx'
import Prensa from './components/Prensa.tsx'
import Transparencia from './components/Transparencia.tsx'
import Contacto from './components/Contacto.tsx'
import Footer from './components/Footer.tsx'
import AdminPanel from './components/AdminPanel.tsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isPanel, setIsPanel] = useState(() => window.location.hash.startsWith('#/panel'))

  useEffect(() => {
    const onHashChange = () => setIsPanel(window.location.hash.startsWith('#/panel'))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

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
  }, [isPanel])

  if (isPanel) return <AdminPanel />

  return (
    <div id="top">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <QuienSoy />
        <PorQueMeInvolucre />
        <Candidatura />
        <Trayectoria />
        <Propuestas />
        <Prioridades />
        <VisionMisionValores />
        <Participa />
        <ProponeIdea />
        <PropuestasComunidad />
        <Seguimiento />
        <ContameQuePasa />
        <MapaParticipacion />
        <AgendaPublica />
        <PreguntasRespuestas />
        <RedesSociales />
        <Prensa />
        <Transparencia />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
