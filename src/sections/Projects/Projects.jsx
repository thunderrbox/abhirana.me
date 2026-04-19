import { useState } from 'react';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { PROJECTS } from '../../data/projects.js';
import './Projects.css';

function ProjectCard({ project, index, onClick }) {
  return (
    <FadeUp delay={0.1 + index * 0.1}>
      <div className={`project-card ${project.featured ? 'featured' : ''}`} onClick={() => onClick(project)}>
        <div className="project-card-header">
          <div className="project-card-meta">
            <span className={`project-status-badge ${project.status}`}>
              {project.status === 'ongoing' ? '● In Progress' : '✓ Completed'}
            </span>
            <span className="project-year">{project.year}</span>
          </div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-subtitle">{project.subtitle}</p>
        </div>

        <div className="project-card-body">
          <div className="project-storytelling">
            <div className="project-story-item">
              <span className="project-story-label">Problem</span>
              <p className="project-story-text">{project.problem}</p>
            </div>
            <div className="project-story-item">
              <span className="project-story-label">Solution</span>
              <p className="project-story-text">{project.solution}</p>
            </div>
          </div>

          {project.architecture && (
            <div className="project-architecture">
              <span className="project-arch-label">Architecture</span>
              <code className="project-arch-flow">{project.architecture}</code>
            </div>
          )}
        </div>

        <div className="project-card-footer">
          <div className="project-stack-pills">
            {project.stack.map(tech => (
              <span key={tech} className="project-tech-pill">{tech}</span>
            ))}
          </div>
          <div className="project-card-links">
            {project.github && (
              <a href={project.github} className="project-link-btn" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} className="project-link-btn primary" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>✕</button>

        <div className="project-modal-content">
          <span className={`project-status-badge ${project.status}`}>
            {project.status === 'ongoing' ? '● In Progress' : '✓ Completed'}
          </span>
          <h3 className="project-modal-title">{project.title}</h3>
          <p className="project-modal-subtitle">{project.subtitle}</p>

          <div className="project-modal-sections">
            <div className="project-modal-section">
              <h4>The Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div className="project-modal-section">
              <h4>The Solution</h4>
              <p>{project.solution}</p>
            </div>
            {project.architecture && (
              <div className="project-modal-section">
                <h4>Architecture</h4>
                <code className="project-arch-flow modal">{project.architecture}</code>
              </div>
            )}
            <div className="project-modal-section">
              <h4>Impact</h4>
              <p>{project.impact}</p>
            </div>
            {project.techDecisions && project.techDecisions.length > 0 && (
              <div className="project-modal-section">
                <h4>Tech Decisions</h4>
                <div className="project-tech-decisions">
                  {project.techDecisions.map((td, i) => (
                    <div key={i} className="tech-decision-item">
                      <span className="tech-decision-name">{td.tech}</span>
                      <span className="tech-decision-why">{td.why}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="project-modal-stack">
            {project.stack.map(tech => (
              <span key={tech} className="project-tech-pill">{tech}</span>
            ))}
          </div>

          <div className="project-modal-actions">
            {project.github && (
              <a href={project.github} className="btn-outline" target="_blank" rel="noopener noreferrer">
                View on GitHub ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} className="btn-primary" target="_blank" rel="noopener noreferrer">
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="projects" id="projects">
      <FadeUp>
        <span className="section-eyebrow">Projects</span>
        <h2 className="section-title">What I've Built</h2>
        <p className="section-subtitle">
          Each project reflects real architecture decisions — Docker sandboxing,
          async job queues, graph algorithms, and production-grade design patterns.
        </p>
      </FadeUp>

      <div className="projects-list">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
