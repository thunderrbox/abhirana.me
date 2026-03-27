import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',      href: '/#about',     id: 'about' },
  { label: 'Skills',     href: '/#skills',    id: 'skills' },
  { label: 'Projects',   href: '/#projects',  id: 'projects' },
  { label: 'Playground', href: '/#blogs',     id: 'blogs' },
  { label: 'Education',  href: '/#education', id: 'education' },
  { label: 'Contact',    href: '/contact',    id: 'contact' },
];

export default function Navbar({ onTerminalOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme]       = useState('dark');
  const location = useLocation();

  // Scroll spy to highlight active section on the home page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Only do scroll spy if we are on the homepage
      if (location.pathname === '/') {
        const sections = ['hero', 'about', 'skills', 'projects', 'blogs', 'education', 'resume'];
        let cur = '';
        sections.forEach(id => {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 120) cur = id;
        });
        setActive(cur);
      } else {
        // If we are on a different route (e.g. /contact), set active to the path name
        setActive(location.pathname.slice(1));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger once on mount/location change to set correct initial active state
    onScroll(); 
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  // Use native anchor links for cross-page hash navigation, to ensure it navigates to / and scrolls
  const handleLogoClick = (e) => {
    if (location.pathname === '/' && window.scrollY === 0) {
      e.preventDefault();
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href={`${import.meta.env.BASE_URL}#hero`} className="nav-logo" onClick={handleLogoClick}>
          <span className="logo-asr">RANA</span><span className="logo-dot">.me</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              {l.href.startsWith('/#') ? (
                <a
                  href={`${import.meta.env.BASE_URL}${l.href.substring(1)}`}
                  className={active === l.id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  to={l.href}
                  className={active === l.id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button
            className="nav-terminal-btn"
            onClick={onTerminalOpen}
            title="Open Terminal (Ctrl+Alt+T)"
            aria-label="Open Terminal"
          >
            <span className="mono">&gt;_</span>
          </button>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a
            href={PERSONAL_INFO.resumePdf}
            className="btn-outline-green nav-resume-btn"
            download="Abhijeet_Singh_Rana_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↓
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(l => (
          l.href.startsWith('/#') ? (
            <a key={l.href} href={`${import.meta.env.BASE_URL}${l.href.substring(1)}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ) : (
            <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          )
        ))}
        <a href={PERSONAL_INFO.resumePdf} download="Abhijeet_Singh_Rana_Resume.pdf" className="mob-resume">
          ⬇ Resume PDF
        </a>
      </div>
      {/* Available badge */}
      <div className="avail-badge" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); }}>
        <span className="avail-dot" />
        Available for Internships
      </div>
    </>
  );
}
