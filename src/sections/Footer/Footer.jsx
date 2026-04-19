import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#hero" className="footer-logo">AR.</a>
        
        <div className="footer-links">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
        </div>
        
        <button className="footer-back-top" onClick={scrollToTop}>
          ↑ Back to Top
        </button>
      </div>
      
      <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <p className="footer-name" style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
          {PERSONAL_INFO.name}
        </p>
        <p className="footer-details" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>{PERSONAL_INFO.email}</span>
          <span className="footer-dot hidden-mobile">•</span>
          <span>{PERSONAL_INFO.phone}</span>
          <span className="footer-dot hidden-mobile">•</span>
          <span>{PERSONAL_INFO.location}</span>
          <span className="footer-dot hidden-mobile">•</span>
          <span>Open for Roles</span>
        </p>
        <p style={{ marginTop: '8px' }}>&copy; {new Date().getFullYear()} All rights reserved. Building fast, scalable, and reliable systems.</p>
      </div>
    </footer>
  );
}
