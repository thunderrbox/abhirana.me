import { useState, useMemo, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {
  SKILLS,
  RADAR_DATA,
  EXPLORING,
  SKILL_CATEGORIES,
} from '../../data/skills.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Skills.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? SKILLS : SKILLS.filter((s) => s.cat === filter)),
    [filter]
  );

  const [isLight, setIsLight] = useState(
    document.documentElement.getAttribute('data-theme') === 'light'
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.attributeName === 'data-theme') {
          setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const radarConfig = {
    data: {
      labels: RADAR_DATA.labels,
      datasets: [
        {
          label: 'Proficiency',
          data: RADAR_DATA.data,
          borderColor:       isLight ? '#c9920a' : '#e8b63a',
          backgroundColor:   isLight ? 'rgba(201,146,10,0.10)' : 'rgba(232,182,58,0.08)',
          pointBackgroundColor: isLight ? '#18a050' : '#4ade80',
          pointBorderColor:     isLight ? '#18a050' : '#4ade80',
          pointRadius: 4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { display: false, stepSize: 20 },
          grid: {
            color: isLight ? 'rgba(201,146,10,0.12)' : 'rgba(232,182,58,0.08)',
          },
          angleLines: {
            color: isLight ? 'rgba(201,146,10,0.12)' : 'rgba(232,182,58,0.08)',
          },
          pointLabels: {
            color: isLight ? '#1c1a14' : '#f0ece4',
            font: { family: 'Fira Code', size: 11 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isLight ? '#fdfaf4' : '#1a1a1a',
          borderColor:     isLight ? '#c9920a'  : '#e8b63a',
          borderWidth: 1,
          titleFont:  { family: 'Fira Code', size: 12 },
          bodyFont:   { family: 'Fira Code', size: 11 },
          titleColor: isLight ? '#c9920a'  : '#e8b63a',
          bodyColor:  isLight ? '#1c1a14'  : '#f0ece4',
        },
      },
    },
  };

  return (
    <section className="skills" id="skills">
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; skills.json</span>
        <h2 className="section-title">Tech Arsenal</h2>

        <div className="skills-layout">
          <div>
            {/* Filters */}
            <div className="skills-filters">
              {SKILL_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  className={`skills-filter-btn ${filter === c.key ? 'active' : ''}`}
                  onClick={() => setFilter(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Skill chips */}
            <div className="skills-grid">
              {filtered.map((s, i) => (
                <div
                  key={s.name}
                  className="skill-chip"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <span className="skill-chip-icon">{s.icon}</span>
                  {s.name}
                  <span className="skill-chip-level">{s.level}%</span>
                </div>
              ))}
            </div>

            {/* Exploring */}
            <div className="skills-exploring">
              <h3>&gt; currently_exploring</h3>
              <div className="skills-exploring-chips">
                {EXPLORING.map((e) => (
                  <span key={e} className="exploring-chip">{e}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Radar chart */}
          <div className="skills-radar-wrap morph-border">
            <div className="skills-radar-title">// proficiency radar</div>
            <Radar {...radarConfig} />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
