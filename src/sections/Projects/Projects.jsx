import { useState, useMemo, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { PROJECTS, PROJECT_FILTERS } from '../../data/projects.js';
import './Projects.css';

function ProjectCard({ project, onClick }) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={400}
      className="project-tilt-wrapper"
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="rgba(232, 182, 58, 0.4)"
      glarePosition="all"
    >
      <div
        className="project-card"
        onClick={() => onClick(project)}
        style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
      >
        <div className="project-thumb" style={{ background: project.color }}>
          <span className="project-thumb-icon">{project.icon}</span>
          <span className={`project-status ${project.status}`}>{project.status}</span>
          {project.featured && <span className="project-featured">⭐</span>}
        </div>
        <div className="project-body">
          <div className="project-title-row">
            <span className="project-title">{project.title}</span>
            <span className="project-diff">{project.difficulty}</span>
          </div>
          <p className="project-tagline">{project.tagline}</p>
          <div className="project-stack">
            {project.stack.map((t) => (
              <span key={t} className="project-stack-chip">{t}</span>
            ))}
          </div>
          <div className="project-links">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                🐙 GitHub
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header" style={{ background: project.color }}>
          <span className="project-modal-header-icon">{project.icon}</span>
          <button className="project-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="project-modal-body">
          <h3 className="project-modal-title">{project.title}</h3>
          <p className="project-modal-tagline">{project.tagline}</p>
          <p className="project-modal-desc">{project.description}</p>

          <div className="project-modal-stack">
            {project.stack.map((t) => (
              <span key={t} className="project-stack-chip">{t}</span>
            ))}
          </div>

          {project.learned && (
            <div className="project-modal-learned">
              <div className="project-modal-learned-title">💡 What I Learned</div>
              <p>{project.learned}</p>
            </div>
          )}

          <div className="project-modal-actions">
            {project.github && project.github !== '#' && (
              <a href={project.github} className="btn-outline-green" target="_blank" rel="noopener noreferrer">
                🐙 View on GitHub
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} className="btn-primary" target="_blank" rel="noopener noreferrer">
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <section className="projects" id="projects">
      <FadeUp className="reveal-wrap visible" delay={0.1}>
        <span className="section-tag">&gt; projects.map()</span>
        <h2 className="section-title">What I've Built</h2>
        <p className="section-sub">
          Each project is battle-tested with real architecture decisions — Docker,
          Redis, graphs, and DSA under the hood.
        </p>

        <div className="projects-filters">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`projects-filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>
      </FadeUp>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
