import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Experience.css';

const EXPERIENCES = [
  {
    title: 'Docker-Sandboxed Code Execution Engine',
    role: 'Systems Architecture',
    period: '2024 — Present',
    highlights: [
      'Architected a Docker-sandboxed execution engine for safe, isolated code execution with strict memory limits and timeouts',
      'Engineered container lifecycle management with deterministic execution environments and network constraints',
      'Designed async submission pipeline with Redis + BullMQ for scalable concurrent job processing',
    ],
  },
  {
    title: 'CPU Scheduling Algorithm Platform',
    role: 'OS & Algorithm Development',
    period: '2024',
    highlights: [
      'Implemented 6 CPU scheduling algorithms from scratch (FCFS, SJF, SRTF, Round Robin, Priority, MLQ)',
      'Built graph-based dependency resolution using topological sort for process ordering',
      'Designed heap-driven priority queues for O(log n) dynamic process optimization',
    ],
  },
  {
    title: 'Competitive Programming',
    role: 'Algorithmic Problem Solving',
    period: '2023 — Present',
    highlights: [
      'Achieved LeetCode peak rating of 1590 through consistent contest participation',
      'Solved 500+ problems spanning DP, Graph Theory, Trees, Sliding Window, and Two Pointers',
      'Mastered advanced patterns including Segment Trees, Union-Find, and Monotonic Stacks',
    ],
  },
  {
    title: 'Hackathon Participation',
    role: 'ISRO · Adobe · TVS E.P.I.C',
    period: '2023 — 2024',
    highlights: [
      'ISRO Space Hackathon — Designed algorithmic solutions for satellite data processing challenges',
      'Adobe India Hackathon — Prototyped creative and technical solutions for digital experiences',
      'TVS E.P.I.C 7.0 — Built architectural approaches for industry-specific mobility problems',
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <FadeUp>
        <span className="section-eyebrow">Experience</span>
        <h2 className="section-title">Milestones & Builds</h2>
        <p className="section-subtitle">
          Key engineering milestones, from systems architecture to algorithmic problem solving.
        </p>
      </FadeUp>

      <div className="experience-timeline">
        {EXPERIENCES.map((exp, i) => (
          <FadeUp key={i} className="exp-card" delay={0.1 + i * 0.1}>
            <div className="exp-card-left">
              <span className="exp-period">{exp.period}</span>
              <span className="exp-role">{exp.role}</span>
            </div>
            <div className="exp-card-right">
              <h3 className="exp-title">{exp.title}</h3>
              <ul className="exp-highlights">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="exp-highlight">{h}</li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
