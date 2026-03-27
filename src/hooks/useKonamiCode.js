import { useEffect, useCallback } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];

export function useKonamiCode(callback) {
  useEffect(() => {
    let index = 0;
    const handleKey = (e) => {
      if (e.key === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [callback]);
}
