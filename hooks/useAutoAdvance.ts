"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoAdvance(count: number, intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  return {
    index,
    setIndex,
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
  };
}
