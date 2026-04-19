import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-split">
        {/* Left Side: Content */}
        <div className="hero-left">
          <div className="hero-pill-badge" style={{ animationDelay: '0.1s' }}>
            <span className="hero-status-dot" />
            Available for New Roles
          </div>

          <h1 className="hero-title" style={{ animationDelay: '0.2s' }}>
            Hey, I'm {PERSONAL_INFO.firstName}.<br />
            <span className="gradient-text">Backend</span> Engineer.
          </h1>

          <p className="hero-description" style={{ animationDelay: '0.3s' }}>
            {PERSONAL_INFO.heroSubtitle}
          </p>

          <div className="hero-actions" style={{ animationDelay: '0.4s' }}>
            <a href="#contact" className="btn-primary">
              Contact Me
            </a>
            <a href="#projects" className="btn-outline">
              Discover Work
            </a>
          </div>

          <div className="hero-tags" style={{ animationDelay: '0.5s' }}>
            <span className="hero-tag">System Architecture</span>
            <span className="hero-tag">Docker</span>
            <span className="hero-tag">DSA Optimization</span>
          </div>
        </div>

        {/* Right Side: Visual Accent */}
        <div className="hero-right" style={{ animationDelay: '0.3s' }}>
          <div className="hero-visual-card">
            <div className="visual-card-header">
              <span className="dot red"/>
              <span className="dot yellow"/>
              <span className="dot green"/>
            </div>
            <div className="visual-card-body">
              <pre><code>
<span className="code-comment">// System Status</span><br/>
<span className="code-keyword">const</span> <span className="code-var">developer</span> = {'{'}<br/>
&nbsp;&nbsp;name: <span className="code-string">"{PERSONAL_INFO.name}"</span>,<br/>
&nbsp;&nbsp;role: <span className="code-string">"{PERSONAL_INFO.title}"</span>,<br/>
&nbsp;&nbsp;lc_peak: <span className="code-number">1590</span>,<br/>
&nbsp;&nbsp;status: <span className="code-string">"Compiling..."</span><br/>
{'}'};
              </code></pre>
            </div>
            
            <div className="visual-card-badge">
              {PERSONAL_INFO.stats[0].value}{PERSONAL_INFO.stats[0].suffix} Problems Solved
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
