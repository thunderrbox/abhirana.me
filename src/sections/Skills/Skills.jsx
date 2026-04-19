import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { SKILL_GROUPS, EXPLORING } from '../../data/skills.js';
import './Skills.css';

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <FadeUp>
        <span className="section-eyebrow">Skills</span>
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          Tools and technologies I use to build production-grade systems.
        </p>
      </FadeUp>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group, gi) => (
          <FadeUp key={group.label} className="skill-group-card" delay={0.1 + gi * 0.08}>
            <h3 className="skill-group-label">{group.label}</h3>
            <div className="skill-chips">
              {group.skills.map(s => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </FadeUp>
        ))}

        <FadeUp className="skill-group-card exploring-card" delay={0.6}>
          <h3 className="skill-group-label exploring-label">Currently Exploring</h3>
          <div className="skill-chips">
            {EXPLORING.map(e => (
              <span key={e} className="skill-chip exploring">{e}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
