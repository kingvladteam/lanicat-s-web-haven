import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

const CountUp = ({ from, to, duration = 2000, decimals = 0, suffix = "" }: CountUpProps) => {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 5);
            setValue(from + (to - from) * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
