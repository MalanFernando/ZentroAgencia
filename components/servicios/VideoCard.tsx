"use client";

import { useRef } from "react";

type VideoCardProps = {
  src: string;
  alt: string;
  className?: string;
  onPlay: () => void;
};

export function VideoCard({ src, alt, className = "", onPlay }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function startPreview() {
    videoRef.current?.play().catch(() => {});
  }

  function stopPreview() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0.1;
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      aria-label={`Reproducir: ${alt}`}
      className={`group relative block h-full w-full cursor-pointer overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full w-full object-cover"
        onLoadedMetadata={() => {
          const video = videoRef.current;
          if (video) video.currentTime = 0.1;
        }}
      />
      <svg
        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 group-hover:opacity-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" fill="rgba(255,255,255,0.9)" />
      </svg>
    </button>
  );
}
