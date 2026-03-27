import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import './KonamiOverlay.css';

export default function KonamiOverlay({ onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#39ff14', '#f5ff00', '#a8ff3e', '#ffffff'],
    });
  }, []);

  return (
    <div className="konami-overlay" onClick={onClose}>
      <div className="konami-box">
        <div className="konami-icon">🎮</div>
        <h2 className="konami-title">CHEAT CODE ACTIVATED</h2>
        <p className="konami-sub mono">"You found it. You're clearly one of us."</p>
        <div className="konami-code mono">↑ ↑ ↓ ↓ ← → ← → B A</div>
        <button className="btn-primary" onClick={onClose}>
          Back to Reality →
        </button>
      </div>
    </div>
  );
}
