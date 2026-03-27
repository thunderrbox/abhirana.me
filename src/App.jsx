import { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx';
import Terminal from './components/Terminal/Terminal.jsx';
import MatrixRain from './components/MatrixRain/MatrixRain.jsx';
import KonamiOverlay from './components/KonamiOverlay/KonamiOverlay.jsx';
import IdleBubble from './components/IdleBubble/IdleBubble.jsx';
import { useKonamiCode } from './hooks/useKonamiCode.js';
import { useIdleTimer } from './hooks/useIdleTimer.js';

import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Skills from './sections/Skills/Skills.jsx';
import Projects from './sections/Projects/Projects.jsx';
import Experience from './sections/Experience/Experience.jsx';
import Blogs from './sections/Blogs/Blogs.jsx';
import Education from './sections/Education/Education.jsx';
import Resume from './sections/Resume/Resume.jsx';
import Contact from './sections/Contact/Contact.jsx';
import Footer from './sections/Footer/Footer.jsx';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [idleBubble, setIdleBubble] = useState(false);

  const triggerKonami = useCallback(() => setKonamiActive(true), []);
  useKonamiCode(triggerKonami);

  const showIdleBubble = useCallback(() => {
    setIdleBubble(true);
    setTimeout(() => setIdleBubble(false), 6000);
  }, []);
  useIdleTimer(60000, showIdleBubble);

  const triggerMatrix = () => {
    setMatrixActive(true);
    setTimeout(() => setMatrixActive(false), 4000);
  };

  useEffect(() => {
    const initParticles = (isLight) => {
      const pColor = isLight ? '#c9920a' : '#ccff00';
      const pOpacity = isLight ? 0.55 : 0.4;
      const lineOpacity = isLight ? 0.3 : 0.25;
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: pColor },
            shape: { type: 'circle' },
            opacity: { value: pOpacity, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 130, color: pColor, opacity: lineOpacity, width: 1 },
            move: { enable: true, speed: 1.5 }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' }
            },
            modes: {
              grab: { distance: 180, line_linked: { opacity: 0.4 } },
              push: { particles_nb: 3 }
            }
          },
          retina_detect: true
        });
      }
    };

    // Initial load
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    initParticles(currentTheme === 'light');

    // Watch for theme changes to automatically redraw particles
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          initParticles(newTheme === 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Listen for Ctrl+Alt+T
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.altKey && e.key === 't') {
      e.preventDefault();
      setTerminalOpen(true);
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none' }}>
      {/* Side Ambient Glows */}
      <div className="ambient-glow-left"></div>
      <div className="ambient-glow-right"></div>

      {/* Particles Array Background */}
      <div id="particles-js" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <ScrollProgress />
      <Navbar onTerminalOpen={() => setTerminalOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero onMatrixTrigger={triggerMatrix} />
              <div className="grad-div" />
              <About />
              <div className="grad-div" />
              <Skills />
              <div className="grad-div" />
              <Projects />
              <div className="grad-div" />
              <Experience />
              <div className="grad-div" />
              <Blogs />
              <div className="grad-div" />
              <Education />
              <div className="grad-div" />
              <Resume />
            </>
          } />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      {/* Easter eggs */}
      {matrixActive && <MatrixRain />}
      {terminalOpen && (
        <Terminal
          onClose={() => setTerminalOpen(false)}
          onMatrix={triggerMatrix}
        />
      )}
      {konamiActive && <KonamiOverlay onClose={() => setKonamiActive(false)} />}
      {idleBubble && <IdleBubble onDismiss={() => setIdleBubble(false)} />}
    </div>
  );
}
