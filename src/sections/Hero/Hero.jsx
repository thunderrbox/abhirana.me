import { useEffect, useRef, useState, useCallback } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Hero.css';

const PARALLAX_KEYWORDS = [
  'AWS', 'Docker', 'React.js', 'Kubernetes', 'CI/CD', 'DSA', 
  'C++', 'TypeScript', 'Node.js', 'Linux', 'Microservices', 
  'MongoDB', 'PostgreSQL', 'Redis', 'BullMQ', 'Express', 'Git',
  'Systems Design', 'Algorithms', 'Cloud', 'Automation'
];

const FloatingKeyword = ({ text, index, scrollY }) => {
  const randomX = (index * 13) % 90 + 5;
  const randomY = (index * 29) % 90 + 5;
  const randomSize = 12 + (index % 6);
  const scrollFactor = 0.005 + (index % 5) * 0.002;
  const direction = index % 2 === 0 ? 1 : -1;
  const randomOpacity = 0.03 + (index % 3) * 0.02;

  return (
    <div
      className="hero-floating-keyword"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        transform: `translateY(${scrollY * scrollFactor * direction}px)`,
        fontSize: `${randomSize}px`,
        opacity: randomOpacity,
      }}
    >
      {text}
    </div>
  );
};

/* ── Glitch text scramble ── */
const GLITCH_CHARS = '@#$%&!0189XZAB';
function scramble(text, duration = 400) {
  return new Promise((resolve) => {
    const arr = text.split('');
    const orig = [...arr];
    const interval = setInterval(() => {
      for (let i = 0; i < arr.length; i++) {
        if (Math.random() < 0.4)
          arr[i] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        else arr[i] = orig[i];
      }
      resolve(arr.join(''));
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      resolve(text);
    }, duration);
  });
}

export default function Hero({ onMatrixTrigger }) {
  const typedRef = useRef(null);
  const typedEl = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [displayName, setDisplayName] = useState('ABHIJEET\nSINGH RANA');
  const [glitching, setGlitching] = useState(true);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  // Scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typed.js
  useEffect(() => {
    typedRef.current = new Typed(typedEl.current, {
      strings: PERSONAL_INFO.typedStrings,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => typedRef.current?.destroy();
  }, []);

  // Initial glitch on mount
  useEffect(() => {
    const name = 'ABHIJEET SINGH RANA';
    let isMounted = true;
    const run = async () => {
      for (let i = 0; i < 8 && isMounted; i++) {
        const scrambled = await scramble(name, 60);
        if (isMounted) setDisplayName(scrambled);
        await new Promise((r) => setTimeout(r, 50));
      }
      if (isMounted) {
        setDisplayName('ABHIJEET\nSINGH RANA');
        setGlitching(false);
      }
    };
    run();
    return () => { isMounted = false; };
  }, []);

  const handleNameHover = useCallback(async () => {
    if (glitching) return;
    setGlitching(true);
    const name = 'ABHIJEET SINGH RANA';
    for (let i = 0; i < 6; i++) {
      const s = await scramble(name, 50);
      setDisplayName(s);
      await new Promise((r) => setTimeout(r, 40));
    }
    setDisplayName('ABHIJEET\nSINGH RANA');
    setGlitching(false);
  }, [glitching]);

  // 5x click → matrix
  const handleNameClick = () => {
    clickCount.current++;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clickCount.current = 0), 1200);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      onMatrixTrigger?.();
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-floating-keywords-container">
        {PARALLAX_KEYWORDS.map((k, i) => (
          <FloatingKeyword key={i} text={k} index={i} scrollY={scrollY} />
        ))}
      </div>
      <FadeUp className="hero-content" delay={0.2} yOffset={40}>
        <p className="hero-init">&gt; initializing portfolio... complete</p>

        <div
          className="hero-name-wrap"
          onMouseEnter={handleNameHover}
          onClick={handleNameClick}
        >
          <h1 className="hero-name" style={{ whiteSpace: 'pre-line' }}>
            {displayName}
          </h1>
        </div>

        <div className="hero-typed-wrap">
          <span ref={typedEl} />
        </div>

        <p className="hero-quote">"{PERSONAL_INFO.positioning}"</p>

        <div className="hero-cta">
          <a href="/#projects" className="btn-outline-green">
            View Projects ↓
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            className="btn-primary"
            download="Abhijeet_Singh_Rana_Resume.pdf"
          >
            ↓ Resume
          </a>
          <Link to="/contact" className="btn-outline-yellow">
            Let's Talk
          </Link>
        </div>

        <div className="hero-socials">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
            <span>{'</>'}</span> GitHub
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
            <span>in</span> LinkedIn
          </a>
          <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer">
            <span>LC</span> LeetCode
          </a>
          <a href={PERSONAL_INFO.gfg} target="_blank" rel="noopener noreferrer">
            <span>GfG</span>
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`}>
            <span>@</span> Email
          </a>
        </div>
      </FadeUp>

      <div className="hero-scroll">
        <span className="hero-scroll-text">scroll.exe</span>
        <span className="hero-scroll-arrow">↓</span>
      </div>
    </section>
  );
}
