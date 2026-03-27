import { PERSONAL_INFO } from '../../data/personalInfo.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Resume.css';

const HIGHLIGHTS = [
  'C++', 'JavaScript', 'React', 'Node.js', 'PostgreSQL',
  'Redis', 'Docker', 'DSA', '500+ Problems',
];

export default function Resume() {
  return (
    <section className="resume" id="resume">
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; cat resume.pdf</span>
        <h2 className="section-title">resume.pdf</h2>

        <iframe
          className="resume-preview"
          src={PERSONAL_INFO.resumePdf}
          title="Resume Preview"
          loading="lazy"
        />

        <div className="resume-actions">
          <a
            href={PERSONAL_INFO.resumePdf}
            className="btn-primary"
            download="Abhijeet_Singh_Rana_Resume.pdf"
          >
            ⬇ Download PDF
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            className="btn-outline-green"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View Full Page
          </a>
        </div>

        <div className="resume-updated">Last Updated: 2026</div>

        <div className="resume-highlights">
          {HIGHLIGHTS.map((h) => (
            <span key={h} className="resume-highlight-chip">{h}</span>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
