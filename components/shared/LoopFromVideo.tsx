"use client";

import { useEffect, useRef } from "react";

type LoopFromVideoProps = {
  src: string;
  startAt?: number;
  className?: string;
};

export function LoopFromVideo({ src, startAt = 0, className = "" }: LoopFromVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    function seekToStart() {
      if (video) video.currentTime = startAt;
    }
    function onEnded() {
      if (!video) return;
      video.currentTime = startAt;
      video.play().catch(() => {});
    }

    if (video.readyState >= 1) seekToStart();
    video.addEventListener("loadedmetadata", seekToStart);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("ended", onEnded);
    };
  }, [src, startAt]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
    />
  );
}
