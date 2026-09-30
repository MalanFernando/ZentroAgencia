"use client";

import { useEffect, useRef, useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import serviciosData from "@/data/servicios";
import { Shape } from "@/components/shared/Shape";

const cardTilt = [
  { r: -4.5, dy: "0.5%", ratio: "242 / 382" },
  { r: 4, dy: "7%", ratio: "246 / 370" },
  { r: 0, dy: "1.5%", ratio: "267 / 364" },
  { r: -1, dy: "9.5%", ratio: "273 / 364" },
  { r: 2, dy: "0%", ratio: "281 / 372" },
];

export function VideoShowcase() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // La caída sigue al scroll (CSS). Cuando una tarjeta termina de caer se marca
  // con data-landed y queda fija: al volver a subir ya no desaparece.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      let pending = 0;
      row.querySelectorAll<HTMLElement>(".video-card:not([data-landed])").forEach((card) => {
        const fall = card.getAnimations().find((a) => "animationName" in a && a.animationName === "video-fall");
        const progress = fall?.effect?.getComputedTiming().progress;
        if (fall && progress != null && progress >= 0.999) card.dataset.landed = "";
        else if (fall) pending++;
      });
      if (!pending) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="video-showcase">
      <div ref={rowRef} className="video-showcase-row">
        {serviciosData.videoShowcase.map((video, i) => {
          const tilt = cardTilt[i % cardTilt.length];
          return (
            <div
              key={video.id}
              className="video-card hover-lift"
              style={{
                marginTop: tilt.dy,
                aspectRatio: tilt.ratio,
                transform: `rotate(${tilt.r}deg)`,
                "--i": i,
              } as React.CSSProperties}
            >
              <VideoCard
                src={video.src}
                alt={video.alt}
                className="h-full w-full"
                onPlay={() => setOpenSrc(video.src)}
              />
            </div>
          );
        })}

        <Shape name="video-card-1" className="video-dood video-dood-a" />
        <Shape name="video-card-2" className="video-dood video-dood-b" />
        <Shape name="video-card-3" className="video-dood video-dood-c" />
        <Shape name="video-card-4" className="video-dood video-dood-e" />
      </div>

      <VideoModal src={openSrc} onClose={() => setOpenSrc(null)} />
    </section>
  );
}
