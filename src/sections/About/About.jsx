import { PERSONAL_INFO } from '../../data/personalInfo.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './About.css';

export default function About() {
  return (
    <section className="about" id="about">
      <FadeUp>
        <span className="section-eyebrow">About</span>
        <h2 className="section-title">{PERSONAL_INFO.name}</h2>
      </FadeUp>

      <div className="about-grid">
        <FadeUp className="about-card about-story" delay={0.1}>
          <h3 className="about-card-title">{PERSONAL_INFO.name}</h3>
          <p className="about-bio">{PERSONAL_INFO.bio}</p>
          <p className="about-bio">{PERSONAL_INFO.bioExtended}</p>
          
          <div className="about-job-status mt-4" style={{ 
            marginTop: '24px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'var(--accent-primary-dim)', 
            border: '1px solid var(--accent-primary-border)',
            padding: '10px 20px', 
            borderRadius: '999px',
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: '600'
          }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: 'var(--accent-primary-glow)', animation: 'pulse 2s infinite' }} />
            Open for Jobs & Internships
          </div>
        </FadeUp>

        <FadeUp className="about-card about-info" delay={0.2}>
          <div className="about-info-item">
            <span className="about-info-label">Location</span>
            <span className="about-info-value">{PERSONAL_INFO.location}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Education</span>
            <span className="about-info-value">{PERSONAL_INFO.degree}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">CGPA</span>
            <span className="about-info-value">{PERSONAL_INFO.cgpa}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Building</span>
            <span className="about-info-value about-building">
              <span className="about-building-dot" />
              {PERSONAL_INFO.currentlyBuilding}
            </span>
          </div>
        </FadeUp>

        <FadeUp className="about-card about-highlights" delay={0.3}>
          <h3 className="about-card-title">Highlights</h3>
          <ul className="about-highlights-list">
            {PERSONAL_INFO.highlights.map((h, i) => (
              <li key={i} className="about-highlight-item">
                <span className="about-highlight-icon">→</span>
                {h}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp className="about-card about-connect" delay={0.4}>
          <h3 className="about-card-title">Connect</h3>
          <div className="about-socials">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="about-social-link">
              <span>GitHub</span>
              <span className="about-social-arrow">↗</span>
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="about-social-link">
              <span>LinkedIn</span>
              <span className="about-social-arrow">↗</span>
            </a>
            <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" className="about-social-link">
              <span>LeetCode</span>
              <span className="about-social-arrow">↗</span>
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="about-social-link">
              <span>Email</span>
              <span className="about-social-arrow">↗</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
