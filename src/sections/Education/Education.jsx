import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { EDUCATION } from '../../data/certifications.js';
import './Education.css';

export default function Education() {
  return (
    <section className="education" id="education">
      <FadeUp>
        <span className="section-eyebrow">Education</span>
        <h2 className="section-title">Academic Background</h2>
      </FadeUp>

      <div className="edu-single-column">
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
      </div>
    </section>
  );
}
