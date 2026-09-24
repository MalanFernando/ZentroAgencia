"use client";

import { useState } from "react";
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

  return (
    <section className="video-showcase">
      <div className="video-showcase-row">
        {serviciosData.videoShowcase.map((video, i) => {
          const tilt = cardTilt[i % cardTilt.length];
          return (
            <div
              key={video.id}
              data-reveal="image"
              className="video-card hover-lift"
              style={{
                marginTop: tilt.dy,
                aspectRatio: tilt.ratio,
                transform: `rotate(${tilt.r}deg)`,
              }}
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
