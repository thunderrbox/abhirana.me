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
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Building fast, scalable, and reliable systems.</p>
      </div>
    </footer>
  );
}
