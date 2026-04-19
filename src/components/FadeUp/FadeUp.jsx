import { useRef, useCallback } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js';

export default function FadeUp({ children, className = '', delay = 0, yOffset = 30, stagger = false, staggerDelay = 0.08 }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
    transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
