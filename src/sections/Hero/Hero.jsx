import { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Hero.css';

function AnimatedCounter({ end, suffix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 50);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(id);
      } else {
        setVal(start);
      }
    }, 25);
    return () => clearInterval(id);
  }, [end]);
  return <>{val}{suffix}</>;
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Mesh gradient background */}
      <div className="hero-mesh" />
      <div className="hero-grid-pattern" />

      <div className="hero-content">
        <div className="hero-eyebrow" style={{ animationDelay: '0.2s' }}>
          <span className="hero-status-dot" />
          Software Engineer
        </div>

        <h1 className="hero-name" style={{ animationDelay: '0.4s' }}>
          <span className="hero-name-line">ABHIJEET</span>
          <span className="hero-name-line gradient-text">SINGH RANA</span>
        </h1>

        <p className="hero-subtitle" style={{ animationDelay: '0.6s' }}>
          {PERSONAL_INFO.heroSubtitle}
        </p>

        <div className="hero-cta" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn-primary">
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M3 8l5 5 5-5" />
            </svg>
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            className="btn-outline"
            download="Abhijeet_Singh_Rana_Resume.pdf"
          >
            Resume
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 1v9M3 7l4 4 4-4M1 12h12" />
            </svg>
          </a>
          <a
            href={PERSONAL_INFO.github}
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats" style={{ animationDelay: '1s' }}>
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-value">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
