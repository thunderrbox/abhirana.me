import { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './About.css';

function AnimatedCounter({ end, suffix = '', color, isVisible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(id);
      } else {
        setVal(start);
      }
    }, 20);
    return () => clearInterval(id);
  }, [isVisible, end]);
  return <span style={{ color }}>{val}{suffix}</span>;
}

export default function About() {
  const [ref, isVisible] = useIntersectionObserver();
  const orbitIcons = ['⚛', '◆', '◇', '⊚', '◎', '⊛'];

  return (
    <section className="about" id="about" ref={ref}>
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; about_me.exe</span>
        <div className="about-grid">
          {/* Left — avatar */}
          <div className="about-avatar-block">
            <div className="about-avatar-ring">
              <div className="about-avatar-border" />
              <div className="about-orbit">
                {orbitIcons.map((ic, i) => (
                  <span key={i} className="about-orbit-icon">{ic}</span>
                ))}
              </div>
              <div className="about-avatar-inner">
                <span className="about-initials">{`{${PERSONAL_INFO.shortName}}`}</span>
              </div>
            </div>
            <p className="about-handle">
              // <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                {PERSONAL_INFO.handle}
              </a>
            </p>
          </div>

          {/* Right — text */}
          <div className="about-text">
            <h2 className="section-title">The Human Behind the Terminal</h2>
            <p className="about-bio">{PERSONAL_INFO.bio1}</p>
            <p className="about-bio">{PERSONAL_INFO.bio2}</p>

            <div className="about-currently">
              → Currently Building: {PERSONAL_INFO.currentlyBuilding}
            </div>

            {/* Fun facts ticker */}
            <div className="about-ticker">
              <div className="about-ticker-track">
                {[...PERSONAL_INFO.funFacts, ...PERSONAL_INFO.funFacts].map((f, i) => (
                  <span key={i} className="about-ticker-item">{f}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="about-stats">
              {PERSONAL_INFO.stats.map((s, i) => (
                <div key={i} className="about-stat-card morph-border">
                  <div className="about-stat-value">
                    <AnimatedCounter end={s.value} suffix={s.suffix} color={s.color} isVisible={isVisible} />
                  </div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <a href={PERSONAL_INFO.resumePdf} download="Abhijeet_Singh_Rana_Resume.pdf" className="btn-outline-green" style={{ marginTop: '20px' }}>
            Download Resume
          </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
