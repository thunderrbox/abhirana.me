import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer-logo">RANA.me</Link>

      <div className="footer-socials">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">{'</>'} GitHub</a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">in LinkedIn</a>
        <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer">LC LeetCode</a>
        <a href={PERSONAL_INFO.gfg} target="_blank" rel="noopener noreferrer">GfG</a>
        <a href={`mailto:${PERSONAL_INFO.email}`}>@ Email</a>
      </div>

      <p className="footer-quote">
        {"// Built with passion, persistence, and way too many LeetCode tabs."}
      </p>

      <button className="footer-top-btn" onClick={scrollToTop}>
        ↑ back_to_top.exe
      </button>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Abhijeet Singh Rana. All rights reserved.
      </p>
    </footer>
  );
}
