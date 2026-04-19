import { useState, useRef, useEffect } from 'react';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './TerminalSection.css';

export default function TerminalSection() {
  const [history, setHistory] = useState([
    { type: 'system', text: `Welcome to ${PERSONAL_INFO.handle} OS v2.0` },
    { type: 'system', text: `Type 'help' to see available commands.` },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Commands: about, skills, contact, clear, sudo';
        break;
      case 'about':
        response = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}. Open for jobs and internships!`;
        break;
      case 'skills':
        response = 'C++, JavaScript, React, Node.js, Docker, Redis, Postgres';
        break;
      case 'contact':
        response = `Email: ${PERSONAL_INFO.email} | LinkedIn: linkedin.com/in/abhi-s-rana`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        response = 'Nice try. This incident will be reported.';
        break;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'user', text: input },
      { type: 'system', text: response }
    ]);
    setInput('');
  };

  return (
    <section className="terminal-section" id="terminal">
      <FadeUp>
        <span className="section-eyebrow">Interactive</span>
        <h2 className="section-title">Terminal Playground</h2>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="term-btn close" />
              <span className="term-btn min" />
              <span className="term-btn max" />
            </div>
            <div className="terminal-title">guest@{PERSONAL_INFO.handle}: ~</div>
          </div>
          
          <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
            {history.map((line, i) => (
              <div key={i} className={`terminal-line ${line.type}`}>
                {line.type === 'user' && <span className="prompt">guest@abhi:~$ </span>}
                {line.text}
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="terminal-input-line">
              <span className="prompt">guest@abhi:~$ </span>
              <input
                id="term-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
