"use client";

import { useEffect, useRef } from "react";

export function useContinuousLoop<T extends Element & ElementCSSInlineStyle>(
  durationMs: number,
  apply: (progress: number, el: T) => void,
) {
  const ref = useRef<T>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    apply(0, el);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    function frame(now: number) {
      const delta = now - last;
      last = now;
      if (!pausedRef.current) {
        elapsed = (elapsed + delta) % durationMs;
        if (el) apply(elapsed / durationMs, el);
      }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return {
    ref,
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
  };
}
