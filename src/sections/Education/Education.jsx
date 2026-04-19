import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from '../../data/certifications.js';
import './Education.css';

export default function Education() {
  return (
    <section className="education" id="education">
      <FadeUp>
        <span className="section-eyebrow">Education</span>
        <h2 className="section-title">Education & Achievements</h2>
      </FadeUp>

      <div className="edu-grid">
        {/* Education Timeline */}
        <FadeUp className="edu-section" delay={0.1}>
          <div className="edu-timeline">
            {EDUCATION.map((e, i) => (
              <div key={i} className="edu-item">
                <div className="edu-dot" style={{ borderColor: e.dotColor }} />
                <div className="edu-content">
                  <span className="edu-year">{e.year}</span>
                  <h4 className="edu-degree">{e.degree}</h4>
                  <p className="edu-institution">{e.institution}</p>
                  <span className="edu-score">{e.score}</span>
                  {e.courses.length > 0 && (
                    <div className="edu-courses">
                      {e.courses.map(c => (
                        <span key={c} className="edu-course-chip">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Achievements */}
        <FadeUp className="edu-section" delay={0.2}>
          <h3 className="edu-section-title">Achievements</h3>
          <div className="achieve-list">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="achieve-item" style={{ '--achieve-color': a.color }}>
                <span className="achieve-text">{a.text}</span>
              </div>
            ))}
          </div>

          <h3 className="edu-section-title" style={{ marginTop: '32px' }}>Certifications</h3>
          <div className="cert-list">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className="cert-item">
                <span className="cert-name">{c.name}</span>
                <span className="cert-platform">{c.platform}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
