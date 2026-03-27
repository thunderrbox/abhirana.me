import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from '../../data/certifications.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Education.css';

export default function Education() {
  return (
    <section className="education" id="education">
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; education.timeline()</span>
        <h2 className="section-title">Education & Certifications</h2>

        <div className="education-layout">
          {/* Left — Timeline */}
          <div className="edu-timeline animate">
            {EDUCATION.map((e, i) => (
              <div key={i} className="edu-item">
                <span className="edu-emoji">{e.emoji}</span>
                <div className="edu-dot" style={{ borderColor: e.dotColor }} />
                <div className="edu-year">{e.year}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-institution">{e.institution}</div>
                <div className="edu-score">{e.score}</div>
                {e.courses.length > 0 && (
                  <div className="edu-courses">
                    {e.courses.map((c) => (
                      <span key={c} className="edu-course-chip">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right — Certs + Achievements */}
          <div className="edu-right">
            <div>
              <div className="edu-certs-title">&gt; certifications</div>
              <div className="cert-list">
                {CERTIFICATIONS.map((c, i) => (
                  <a key={i} href={c.link} className="cert-card" target="_blank" rel="noopener noreferrer">
                    <span className="cert-icon">{c.icon}</span>
                    <div>
                      <div className="cert-name">{c.name}</div>
                      <div className="cert-platform">{c.platform}</div>
                    </div>
                    <span className="cert-date">{c.date}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="edu-achieve-title">&gt; achievements</div>
              <div className="achieve-list">
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={i}
                    className="achieve-card"
                    style={{ borderLeft: `3px solid ${a.color}` }}
                  >
                    <span className="achieve-icon">{a.icon}</span>
                    <span className="achieve-text">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
