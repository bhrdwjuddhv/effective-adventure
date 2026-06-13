import { useState, useEffect } from 'react';

export function useCountUp({ end, duration = 2200, decimals = 0, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let raf;
    let startTime = null;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed  = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(parseFloat((end * eased).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trigger, end, duration, decimals]);

  return count;
}
