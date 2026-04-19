import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../../data/certifications.js';
import './Achievements.css';

export default function Achievements() {
  return (
    <section className="achievements" id="achievements">
      <FadeUp>
        <span className="section-eyebrow">Highlights</span>
        <h2 className="section-title">Achievements</h2>
      </FadeUp>

      <div className="achievements-grid">
        <FadeUp className="achieve-card" delay={0.1}>
          <h3 className="achieve-card-title">Trophies & Milestones</h3>
          <div className="achieve-list">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="achieve-item-new" style={{ '--achieve-color': a.color }}>
                <span className="achieve-dot" />
                <span className="achieve-text">{a.text}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="achieve-card" delay={0.2}>
          <h3 className="achieve-card-title">Certifications</h3>
          <div className="cert-list-new">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className="cert-item-new">
                <div className="cert-left">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-platform">{c.platform}</span>
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                    Verify ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
