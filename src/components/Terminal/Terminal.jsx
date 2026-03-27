import { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Terminal.css';

const COMMANDS = {
  help: () => `<span class="t-yellow">Available commands:</span>
  <span class="t-green">whoami</span>     — About me
  <span class="t-green">skills</span>     — My tech stack
  <span class="t-green">projects</span>   — My projects
  <span class="t-green">contact</span>    — Get in touch
  <span class="t-green">leetcode</span>   — Competitive programming stats
  <span class="t-green">hackathons</span> — Hackathon history
  <span class="t-green">resume</span>     — Download resume
  <span class="t-green">sudo hire</span> — Hire me 😄
  <span class="t-green">matrix</span>     — 👀
  <span class="t-green">clear</span>      — Clear terminal
  <span class="t-green">exit</span>       — Close terminal`,

  whoami: () => `<span class="t-green">Abhijeet Singh Rana</span> | <span class="t-yellow">thunderrbox</span> | CSE 2023–2027
  📍 Kanpur, Uttar Pradesh, India
  🎓 PSIT Kanpur | CGPA: 7.25/10
  📧 abhijeet.s.r.cse@gmail.com`,

  skills: () => `<span class="t-yellow">Languages:</span>  C++, C, JavaScript, TypeScript, Python, Java
<span class="t-yellow">Frontend:</span>   React.js, Next.js, HTML5, CSS3, Tailwind
<span class="t-yellow">Backend:</span>    Node.js, Express.js, REST APIs, Auth/JWT
<span class="t-yellow">Databases:</span>  MongoDB, MySQL, PostgreSQL, Redis
<span class="t-yellow">Tools:</span>      Git, GitHub, Docker, Postman, VS Code
<span class="t-yellow">DSA:</span>        Arrays, DP, Trees/Graphs, Sliding Window`,

  projects: () => `<span class="t-green">⚡ Code & Feedback</span>
  Docker-sandboxed code execution • Redis + BullMQ • PostgreSQL
  → <a href="https://github.com/thunderrbox" target="_blank" class="t-yellow">github.com/thunderrbox</a>

<span class="t-green">📊 Schedule It</span>
  6 CPU scheduling algorithms • Strategy Pattern • Topological Sort
  → <a href="https://github.com/thunderrbox" target="_blank" class="t-yellow">github.com/thunderrbox</a>`,

  contact: () => `📧 <a href="mailto:abhijeet.s.r.cse@gmail.com" class="t-yellow">abhijeet.s.r.cse@gmail.com</a>
💼 <a href="https://linkedin.com/in/abhi-s-rana" target="_blank" class="t-yellow">linkedin.com/in/abhi-s-rana</a>
🐙 <a href="https://github.com/thunderrbox" target="_blank" class="t-yellow">github.com/thunderrbox</a>
📞 +91 9696146006`,

  leetcode: () => `<span class="t-green">LeetCode Stats:</span>
  ✅ 500+ problems solved
  🏆 Peak rating: <span class="t-yellow">1590</span>
  📈 Streak: ongoing
  🔗 <a href="https://leetcode.com/u/Abhijeet_rana/" target="_blank" class="t-yellow">leetcode.com/u/Abhijeet_rana</a>`,

  hackathons: () => `🛰️  <span class="t-green">ISRO Hackathon</span>         — Participant
🎨  <span class="t-yellow">Adobe India Hackathon</span>  — Participant
🚗  <span class="t-green">TVS E.P.I.C 7.0</span>        — Participant`,

  resume: () => `<span class="t-yellow">Opening resume...</span> ⏳`,

  'sudo hire': () => `<span class="t-green">Permission granted.</span> 🔓
Redirecting to contact section... 😄`,

  matrix: () => `<span class="t-green">Initiating matrix sequence...</span> 👾`,

  clear: () => null,
  exit: () => null,
};

export default function Terminal({ onClose, onMatrix }) {
  const [lines, setLines] = useState([
    { type: 'system', html: '<span class="t-green">thunderrbox@portfolio:~$</span> Welcome! Type <span class="t-yellow">help</span> for commands.' }
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);

    const promptLine = { type: 'prompt', html: `<span class="t-green">$</span> ${cmd}` };

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }
    if (trimmed === 'exit') {
      onClose();
      return;
    }
    if (trimmed === 'resume') {
      const a = document.createElement('a');
      a.href = '/resume.pdf';
      a.download = 'Abhijeet_Singh_Rana_Resume.pdf';
      a.click();
    }
    if (trimmed === 'matrix') {
      onMatrix?.();
    }
    if (trimmed === 'sudo hire') {
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 1000);
    }

    const handler = COMMANDS[trimmed];
    const resultHtml = handler ? handler() : `<span style="color:#ff6b6b">Command not found: ${cmd}. Type <span class="t-yellow">help</span> for available commands.</span>`;

    if (resultHtml === null) return;

    setLines(prev => [
      ...prev,
      promptLine,
      { type: 'output', html: resultHtml }
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx] || '');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="term-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="term-window">
        {/* Title bar */}
        <div className="term-titlebar">
          <span className="term-btn red" onClick={onClose} />
          <span className="term-btn yellow" />
          <span className="term-btn green" />
          <span className="term-title mono">abhijeet@portfolio:~$</span>
        </div>

        {/* Output */}
        <div className="term-output" ref={outputRef}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={`term-line ${line.type}`}
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ))}
        </div>

        {/* Input */}
        <div className="term-input-row">
          <span className="term-prompt mono">$</span>
          <input
            ref={inputRef}
            className="term-input mono"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type 'help' to start..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
