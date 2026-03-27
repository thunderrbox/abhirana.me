import { useState } from 'react';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Experience.css';

const EXPERIENCES = [
  {
    name: 'Docker Code Engine',
    role: 'Systems Architecture',
    url: '#',
    start: '2024',
    end: 'Present',
    color: 'var(--accent-gold)',
    icon: '🐳',
    shortDescription: [
      'Architected and built a highly-scalable, Docker-sandboxed code execution engine from scratch to securely run user-submitted code.',
      'Engineered robust container isolation to prevent malicious code escalation and ensure deterministic execution environments.',
      'Implemented system-level protections including strict memory limits, timeouts, and network constraints for safe remote compilation.'
    ],
  },
  {
    name: 'CPU Schedulers',
    role: 'OS Development',
    url: '#',
    start: '2024',
    end: '2024',
    color: 'var(--accent-green)',
    icon: '⚙️',
    shortDescription: [
      'Engineered 6 different CPU scheduling algorithms entirely from scratch to deeply understand operating system internals and resource pooling.',
      'Implemented First-Come First-Served (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin (RR) algorithms in raw C++.',
      'Analyzed context switching overhead, turnaround time, and algorithmic efficiency across simulated process loads.'
    ],
  },
  {
    name: 'Algorithmic Problem Solving',
    role: 'Competitive Programmer',
    url: 'https://leetcode.com/u/thunderrbox/',
    start: '2023',
    end: 'Present',
    color: 'var(--accent-cyan)',
    icon: '⚡',
    shortDescription: [
      'Achieved a peak LeetCode rating of 1590 by consistently participating in weekly contests and algorithmic challenges under time pressure.',
      'Successfully ground through over 500+ complex data structure and algorithm problems across various competitive coding platforms.',
      'Mastered advanced patterns including Dynamic Programming, Graph Theory, Sliding Window, and Tree traversal techniques.'
    ],
  },
  {
    name: 'ISRO Space Hackathon',
    role: 'Participant / Innovator',
    url: '#',
    start: '2024',
    end: '2024',
    color: 'var(--accent-gold)',
    icon: '🚀',
    shortDescription: [
      'Selected to participate in the prestigious ISRO Space Hackathon, tackling complex challenges involving real satellite metrics.',
      'Collaborated seamlessly with a highly focused team to design algorithmic approaches to spatial problem statements under strict time constraints.'
    ],
  },
  {
    name: 'Corporate Hackathons',
    role: 'Participant',
    url: '#',
    start: '2023',
    end: '2024',
    color: 'var(--accent-green)',
    icon: '💡',
    shortDescription: [
      'Participated in the Adobe India Hackathon, rapidly prototyping both creative and technical solutions for digital experiences.',
      'Competed in TVS E.P.I.C 7.0, designing robust architectural approaches to solve dense, industry-specific mobility problem statements.'
    ],
  }
];

export default function Experience() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="experience" id="experience">
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; experience.log</span>
        <h2 className="section-title">Milestones & Builds</h2>

        <div className="exp-container">
          {/* Left: Tab list */}
          <div className="exp-tabs">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={index}
                className={`exp-tab ${index === selected ? 'exp-tab-active' : ''}`}
                onClick={() => setSelected(index)}
              >
                <div className="exp-tab-indicator" style={{ 
                  backgroundColor: index === selected ? exp.color : 'transparent',
                  boxShadow: index === selected ? `0 0 10px ${exp.color}` : 'none'
                }} />
                {exp.name}
              </button>
            ))}
          </div>

          {/* Right: Content details */}
          <div className="exp-content">
            <div className="exp-header" style={{ borderBottomColor: EXPERIENCES[selected].color }}>
              <div className="exp-icon" style={{ color: EXPERIENCES[selected].color }}>
                {EXPERIENCES[selected].icon}
              </div>
              <div className="exp-title-block">
                <h3>
                  {EXPERIENCES[selected].role}
                  <span className="exp-company">
                    {' @ '}
                    <a href={EXPERIENCES[selected].url} target="_blank" rel="noreferrer">
                      {EXPERIENCES[selected].name}
                    </a>
                  </span>
                </h3>
                <p className="exp-date">{EXPERIENCES[selected].start} — {EXPERIENCES[selected].end}</p>
              </div>
            </div>

            <div className="exp-bullets">
              {EXPERIENCES[selected].shortDescription.map((desc, i) => (
                <div key={i} className="exp-bullet-item">
                  <span className="exp-bullet-marker" style={{ color: EXPERIENCES[selected].color }}>▹</span>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
