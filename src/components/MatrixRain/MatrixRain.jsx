import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコABCXZ#$%&@!0189';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const frame = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const isYellow = Math.random() < 0.1;
        ctx.fillStyle = isYellow ? '#f5ff00' : '#39ff14';
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        ctx.fillText(ch, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 40);

    return () => clearInterval(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9500,
        pointerEvents: 'none',
      }}
    />
  );
}
